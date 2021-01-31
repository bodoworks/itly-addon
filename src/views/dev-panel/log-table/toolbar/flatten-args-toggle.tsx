import { Space, Switch } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

interface Props {
    onChange: (checked: boolean) => void;
}

export function FlattenArgsToggle({ onChange }: Props): ReactElement {
    function onSwitchChange(checked: boolean): void {
        onChange(checked);
    }

    return (
        <ToggleContainer>
            <Space>
                <Switch onChange={onSwitchChange} />
                <span>Flatten Properties</span>
            </Space>
        </ToggleContainer>
    );
}
