import { Space } from "antd";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";

import { clearLogs } from "../../../../redux/actions";
import { LogType } from "../../../../redux/types";
import { ClearLogsButton } from "./clear-logs-button";
import { DownloadLogsButton } from "./download-logs-button";
import { FilterEventInput } from "./filter-event-input";
import { FlattenArgsToggle } from "./flatten-args-toggle";

interface Props {
    logType: LogType;
    onFilterEventChange: (value: string) => void;
    onFlattenArgsChange: (checked: boolean) => void;
}

export function Toolbar({
    logType,
    onFilterEventChange,
    onFlattenArgsChange,
}: Props): ReactElement {
    const dispatch = useDispatch();

    function dispatchClearLogs(): void {
        dispatch(clearLogs(logType));
    }

    return (
        <Space>
            <DownloadLogsButton logType={logType} />

            <ClearLogsButton onClick={dispatchClearLogs} />

            <FilterEventInput onChange={onFilterEventChange} />

            <FlattenArgsToggle onChange={onFlattenArgsChange} />
        </Space>
    );
}
