export type SegmentType = "identify" | "track" | "page" | "screen";

export interface Log {
    tstamp: number;
    domain: string;
    event: string | number;
    properties: Record<string, unknown> | null;
    segmentType?: SegmentType;

    // Metadata that we add
    _guid: string; // Our own internal key
}

export const MESSAGE_NEW_LOGS = "NEW_LOGS";
