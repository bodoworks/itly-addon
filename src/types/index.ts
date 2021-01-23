export interface Log {
    args: Record<string, unknown> | null;
    client_session: Record<string, unknown>;
    event: string | number;
    i18n_locale: string;
    sub_app_name: string;
    team_id: string;
    tstamp: number;
    user_id: string;

    // Metadata that we add
    _guid: string; // Our own internal key
}

export type LogType = Record<string, Record<number, string>>;
