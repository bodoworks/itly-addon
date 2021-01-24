import { nanoid } from "nanoid";
import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { browser } from "webextension-polyfill-ts";

import { addLogs } from "../../redux/actions";
import { reducers } from "../../redux/reducers";
import { Log } from "../../types";

const store = createStore(reducers);

wrapStore(store);

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const log = JSON.parse(
            atob(details?.requestBody?.formData?.data as string)
        ) as Log;
        log.tstamp = Date.now();
        log._guid = nanoid();

        store.dispatch(addLogs([log]));
    },
    { urls: ["*://api-js.mixpanel.com/track/*"] },
    ["requestBody"]
);

browser.runtime.onMessage.addListener((request) => {
    console.log("Received some event", request);
});
