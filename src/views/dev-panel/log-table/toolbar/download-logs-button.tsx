import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { parse } from "json2csv";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectLogs } from "../../../../redux/selectors";
import { LogType } from "../../../../redux/types";

interface Props {
    logType: LogType;
}

export function DownloadLogsButton({ logType }: Props): ReactElement {
    const logs = useSelector(selectLogs(logType));

    function onClick(): void {
        const fields = ["tstamp", "event", "properties"];

        try {
            const datetimestr = format(new Date(), "yyyyMMddhhmmss");
            const filename = `events-download-${datetimestr}.csv`;
            const csv = parse(logs, { fields });
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
            saveAs(blob, filename);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Tooltip title="Download" placement="bottom">
            <Button icon={<DownloadOutlined />} onClick={onClick} />
        </Tooltip>
    );
}
