import { Log } from "../types";
import { ADD_LOGS, CLEAR_LOGS, EventActionTypes, LogType } from "./types";

export function addLogs(logType: LogType, logs: Log[]): EventActionTypes {
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
