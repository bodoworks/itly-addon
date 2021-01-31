import takeRight from "lodash/takeRight";
import { combineReducers } from "redux";

import { EventActionTypes, EventState } from "./types";

const DEFAULT_EVENTS_STATE: EventState = {
    logs: {},
};

const MAX_LOGS = 200;

function events(
    state = DEFAULT_EVENTS_STATE,
    action: EventActionTypes
): EventState {
    switch (action.type) {
        case "ADD_LOGS": {
            const newState = {
                ...state,
                logs: {
                    ...state.logs,
                },
            };
            const { logType } = action.payload;
            newState.logs[logType] ??= [];
            newState.logs[logType] = takeRight(
                [...newState.logs[logType], ...action.payload.logs],
                MAX_LOGS
            );

            return newState;
        }
        case "CLEAR_LOGS": {
            const newState = {
                ...state,
                logs: {
                    ...state.logs,
                },
            };
            delete newState.logs[action.payload.logType];

            return newState;
        }
        default:
            return state;
    }
}

export const reducers = combineReducers({
    events,
});
