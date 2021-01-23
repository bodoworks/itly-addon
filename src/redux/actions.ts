import { Log } from "../types";
import { ADD_LOGS, CLEAR_LOGS, EventActionTypes } from "./types";

export function addLogs(newEvents: Log[]): EventActionTypes {
    return {
        type: ADD_LOGS,
        payload: newEvents,
    };
}

export function clearLogs(): EventActionTypes {
    return {
        type: CLEAR_LOGS,
    };
}
