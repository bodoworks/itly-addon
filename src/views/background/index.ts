import { nanoid } from "nanoid";
import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { WebRequest, browser } from "webextension-polyfill-ts";

import { addLogs } from "../../redux/actions";
import { reducers } from "../../redux/reducers";
import { LogType } from "../../redux/types";
import { Log } from "../../types";

import OnBeforeRequestDetailsType = WebRequest.OnBeforeRequestDetailsType;

const store = createStore(reducers);

wrapStore(store);

function getJsonBody(
    details: OnBeforeRequestDetailsType
): Record<string, unknown> {
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

        console.log(details);
        const log: Log = {
            _guid: nanoid(),
            tstamp: Date.now(),
            domain: details.initiator ?? "",
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
        const rawlog = getJsonBody(details);
        const log: Log = {
            _guid: nanoid(),
            tstamp: Date.now(),
            domain: details.initiator ?? "",
            event: rawlog.name as string,
            properties: rawlog.properties as Record<string, unknown>,
        };

        store.dispatch(addLogs(LogType.SEGMENT, [log]));
    },
    { urls: ["*://in.au1.segmentapis.com/v1/p"] },
    ["requestBody"]
);

browser.runtime.onMessage.addListener((request) => {
    console.log("Received some event", request);
});
