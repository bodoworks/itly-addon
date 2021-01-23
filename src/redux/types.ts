import { Log } from "../types";

export const ADD_LOGS = "ADD_LOGS";
export const CLEAR_LOGS = "CLEAR_LOGS";

export interface EventState {
    logs: Log[];
}

interface AddLogsAction {
    type: typeof ADD_LOGS;
    payload: Log[];
}

interface ClearLogsAction {
    type: typeof CLEAR_LOGS;
}

export type EventActionTypes = AddLogsAction | ClearLogsAction;

export interface AppState {
    events: EventState;
}
