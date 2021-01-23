import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { ReactElement } from "react";

interface Props {
    onClick: () => void;
}

export function ClearLogsButton(props: Props): ReactElement {
    const { onClick } = props;

    return (
        <Tooltip title="Clear" placement="bottom">
            <Button icon={<DeleteOutlined />} onClick={onClick} />
        </Tooltip>
    );
}
