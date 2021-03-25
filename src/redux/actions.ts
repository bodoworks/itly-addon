import { browser } from "webextension-polyfill-ts";

import { Log, MESSAGE_NEW_LOGS } from "../types";
import { ADD_LOGS, CLEAR_LOGS, EventActionTypes, LogType } from "./types";

export function addLogs(
    logType: LogType,
    logs: Log[],
    tabId: number
): EventActionTypes {
    browser.tabs.sendMessage(tabId, {
        type: MESSAGE_NEW_LOGS,
        logType,
        logs,
    });

    return {
        type: ADD_LOGS,
        payload: {
            logType,
            logs,
        },
    };
}

export function clearLogs(logType: LogType): EventActionTypes {
    return {
        type: CLEAR_LOGS,
        payload: {
            logType,
        },
    };
}
