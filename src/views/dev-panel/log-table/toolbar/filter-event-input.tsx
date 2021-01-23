import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { ChangeEvent, ReactElement } from "react";

interface Props {
    onChange: (value: string) => void;
}

export function FilterEventInput({ onChange }: Props): ReactElement {
    function onFilterEventChange(event: ChangeEvent<HTMLInputElement>): void {
        onChange(event.target.value);
    }

    return (
        <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            onChange={onFilterEventChange}
        />
    );
}
