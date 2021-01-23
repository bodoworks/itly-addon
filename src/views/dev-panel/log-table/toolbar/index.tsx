import { Space } from "antd";
import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";

import { clearLogs } from "../../../../redux/actions";
import { ClearLogsButton } from "./clear-logs-button";
import { DownloadLogsButton } from "./download-logs-button";
import { FilterEventInput } from "./filter-event-input";
import { FlattenArgsToggle } from "./flatten-args-toggle";

interface Props {
    onFilterEventChange: (value: string) => void;
    onFlattenArgsChange: (checked: boolean) => void;
}

export function Toolbar({
    onFilterEventChange,
    onFlattenArgsChange,
}: Props): ReactElement {
    const dispatch = useDispatch();

    function dispatchClearLogs(): void {
        dispatch(clearLogs());
    }

    return (
        <Space>
            <DownloadLogsButton />

            <ClearLogsButton onClick={dispatchClearLogs} />

            <FilterEventInput onChange={onFilterEventChange} />

            <FlattenArgsToggle onChange={onFlattenArgsChange} />
        </Space>
    );
}
