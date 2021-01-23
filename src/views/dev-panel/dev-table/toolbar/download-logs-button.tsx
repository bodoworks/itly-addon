import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { parse } from "json2csv";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import { selectLogs } from "../../../../redux/selectors";

export function DownloadLogsButton(): ReactElement {
    const logs = useSelector(selectLogs);

    function onClick(): void {
        const fields = ["tstamp", "user_id", "team_id", "event", "args"];

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
