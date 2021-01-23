import takeRight from "lodash/takeRight";
import { combineReducers } from "redux";

import { EventActionTypes, EventState } from "./types";

const DEFAULT_EVENTS_STATE: EventState = {
    logs: [],
};

function events(
    state = DEFAULT_EVENTS_STATE,
    action: EventActionTypes
): EventState {
    switch (action.type) {
        case "ADD_LOGS":
            return {
                ...state,
                // we only want to keep track of the most recent 200 logs to prevent
                // overwhelming the store since these now run in the background
                logs: takeRight([...state.logs, ...action.payload], 200),
            };
        case "CLEAR_LOGS":
            return {
                ...state,
                logs: [],
            };
        default:
            return state;
    }
}

export const reducers = combineReducers({
    events,
});
