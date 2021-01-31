import { Space } from "antd";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";

import { clearLogs } from "../../../../redux/actions";
import { LogType } from "../../../../redux/types";
import { ClearLogsButton } from "./clear-logs-button";
import { DownloadLogsButton } from "./download-logs-button";
import { FilterEventInput } from "./filter-event-input";

interface Props {
    logType: LogType;
    onFilterEventChange: (value: string) => void;
}

export function Toolbar({ logType, onFilterEventChange }: Props): ReactElement {
    const dispatch = useDispatch();

    function dispatchClearLogs(): void {
        dispatch(clearLogs(logType));
    }

    return (
        <Space>
            <FilterEventInput onChange={onFilterEventChange} />

            <DownloadLogsButton logType={logType} />

            <ClearLogsButton onClick={dispatchClearLogs} />
        </Space>
    );
}
