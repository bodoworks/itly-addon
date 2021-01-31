import { Log } from "../types";
import { AppState, LogType } from "./types";

export function selectLogs(logType: LogType): (state: AppState) => Log[] {
    return (state: AppState): Log[] => {
        const { events } = state;
        return events.logs[logType] ?? [];
    };
}
