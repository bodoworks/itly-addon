import { PageHeader, Switch, message } from "antd";
import React, { ReactElement } from "react";

import { useSettings, useUpdateSettings } from "../hooks";

export function SettingsPage(): ReactElement {
    const { isLoading, data: settings } = useSettings();
    const { mutateAsync: updateSettings } = useUpdateSettings();

    if (isLoading || !settings) {
        return <div>Loading...</div>;
    }

    const onShowToastsChange = async (checked: boolean): Promise<void> => {
        try {
            await updateSettings({
                ...settings,
                showToasts: checked,
            });
        } catch (e) {
            console.log(e);
            message.error("Could not update setting");
        }
    };

    return (
        <PageHeader ghost={false} title="Settings">
            Show toasts{" "}
            <Switch
                checked={settings.showToasts}
                onChange={onShowToastsChange}
            />
        </PageHeader>
    );
}
