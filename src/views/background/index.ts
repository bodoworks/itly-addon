import { nanoid } from "nanoid";
import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { WebRequest, browser } from "webextension-polyfill-ts";

import { addLogs } from "../../redux/actions";
import { reducers } from "../../redux/reducers";
import { LogType } from "../../redux/types";
import { Log, SegmentType } from "../../types";

import OnBeforeRequestDetailsType = WebRequest.OnBeforeRequestDetailsType;

const store = createStore(reducers);

wrapStore(store);

type RawLog = Record<string, unknown>;
type AmplitudeLog = Record<string, unknown>;

function getJsonBody(details: OnBeforeRequestDetailsType): RawLog {
    if (details?.requestBody?.formData) {
        return details?.requestBody?.formData;
    }

    const data = details?.requestBody?.raw
        ?.map((data) => {
            return String.fromCharCode.apply(
                null,
                // @ts-ignore
                new Uint8Array(data.bytes)
            );
        })
        .join("") as string;

    return JSON.parse(decodeURIComponent(data));
}

// Mixpanel

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const mixPanelLog = JSON.parse(
            atob(details?.requestBody?.formData?.data as string)
        );

        const log: Log = {
            _guid: nanoid(),
            tstamp: Date.now(),
            domain: details.initiator as string,
            event: mixPanelLog.event,
            properties: mixPanelLog.properties,
        };

        store.dispatch(addLogs(LogType.MIXPANEL, [log]));
    },
    { urls: ["*://api-js.mixpanel.com/track/*"] },
    ["requestBody"]
);

// Segment

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const rawLog = getJsonBody(details);
        const log: Log = {
            _guid: nanoid(),
            tstamp: Date.now(),
            domain: details.initiator as string,
            event: (rawLog.name as string) ?? (rawLog.event as string),
            properties: rawLog.properties as Record<string, unknown>,
            segmentType: rawLog.type as SegmentType,
        };

        store.dispatch(addLogs(LogType.SEGMENT, [log]));
    },
    {
        urls: [
            "*://api.segment.io/v1/i",
            "*://api.segment.io/v1/g",
            "*://api.segment.io/v1/p",
            "*://api.segment.io/v1/t",
        ],
    },
    ["requestBody"]
);

// Amplitude
browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const formData = getJsonBody(details);
        const rawLogs = JSON.parse(formData.e as string) as AmplitudeLog[];

        const logs = rawLogs.map(
            (rawLog): Log => {
                return {
                    _guid: nanoid(),
                    tstamp: rawLog.timestamp as number,
                    domain: details.initiator as string,
                    event: rawLog.event_type as string,
                    properties: rawLog,
                };
            }
        );

        store.dispatch(addLogs(LogType.AMPLITUDE, logs));
    },
    {
        urls: ["https://api.amplitude.com/"],
    },
    ["requestBody"]
);

browser.runtime.onMessage.addListener((request) => {
    console.log("Received some event", request);
});
