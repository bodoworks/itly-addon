import "react-toastify/dist/ReactToastify.css";

import capitalize from "lodash/capitalize";
import React, { ReactElement } from "react";
import { ToastContainer, toast } from "react-toastify";
import { browser } from "webextension-polyfill-ts";

import { LogType } from "../../redux/types";
import { Log, MESSAGE_NEW_LOGS } from "../../types";

export function App(): ReactElement {
    browser.runtime.onMessage.addListener((request) => {
        const { logType, type, logs } = request;
        if (type === MESSAGE_NEW_LOGS) {
            logs.forEach((log: Log) => {
                let event = log.event;
                if (logType === LogType.SEGMENT) {
                    event = log.segmentType as string;
                    if (log.event) {
                        event += ` - ${log.event}`;
                    }
                }

                toast.info(`${capitalize(logType.toLowerCase())} - ${event}`, {
                    position: "bottom-right",
                    autoClose: 5000,
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
