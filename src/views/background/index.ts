import { createStore } from "redux";
import { wrapStore } from "webext-redux";
import { browser } from "webextension-polyfill-ts";

import { getLogs } from "../../common";
import { addLogs } from "../../redux/actions";
import { reducers } from "../../redux/reducers";

const store = createStore(reducers);

wrapStore(store);

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const logs = getLogs(details?.requestBody?.formData?.logs);

        if (!logs.length) {
            return;
        }

        store.dispatch(addLogs(logs));
    },
    { urls: ["*://*"] },
    ["requestBody"]
);

browser.runtime.onMessage.addListener((request) => {
    console.log("Received some event", request);
});
