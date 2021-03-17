import "react-toastify/dist/ReactToastify.css";

import React, { ReactElement } from "react";
import { ToastContainer, toast } from "react-toastify";
import { browser } from "webextension-polyfill-ts";

import { Log, MESSAGE_NEW_LOGS } from "../../types";

export function App(): ReactElement {
    browser.runtime.onMessage.addListener((request) => {
        console.log("Received some event", request);
        if (request.type === MESSAGE_NEW_LOGS) {
            request.logs.forEach((log: Log) => {
                toast.info(`${log.event}`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            });
        }
    });

    return <ToastContainer newestOnTop />;
}
