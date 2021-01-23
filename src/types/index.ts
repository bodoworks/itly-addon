export interface Log {
    tstamp: number;
    event: string | number;
    args: Record<string, unknown> | null;

    // Metadata that we add
    _guid: string; // Our own internal key
}
