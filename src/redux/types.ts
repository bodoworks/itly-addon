import { Log } from "../types";

export enum LogType {
    MIXPANEL = "MIXPANEL",
}

export const ADD_LOGS = "ADD_LOGS";
export const CLEAR_LOGS = "CLEAR_LOGS";

export interface EventState {
    logs: Record<string, Log[]>;
}

interface AddLogsAction {
    type: typeof ADD_LOGS;
    payload: {
        logType: LogType;
        logs: Log[];
    };
}

interface ClearLogsAction {
    type: typeof CLEAR_LOGS;
    payload: {
        logType: LogType;
    };
}

export type EventActionTypes = AddLogsAction | ClearLogsAction;

export interface AppState {
    events: EventState;
}
