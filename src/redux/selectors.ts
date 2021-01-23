import { Log } from "../types";
import { AppState } from "./types";

export function selectLogs(state: AppState): Log[] {
    const { events } = state;
    return events.logs;
}
