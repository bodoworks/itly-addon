import { nanoid } from "nanoid";

import { Log } from "../types";

function addMetadata(logs: Log[]): void {
    logs.forEach((log: Log) => {
        log._guid = nanoid();
    });
}

export function getLogs(payload: string | undefined): Log[] {
    if (!payload) {
        return [];
    }

    try {
        const logs = JSON.parse(decodeURIComponent(payload));

        if (logs) {
            addMetadata(logs);
            return logs;
        }
    } catch {
        // do nothing
    }
    return [];
}
