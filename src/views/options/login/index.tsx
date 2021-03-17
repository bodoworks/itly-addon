import { Form, Input, PageHeader, message } from "antd";
import React, { ChangeEvent, ReactElement } from "react";

import { useSettings, useUpdateSettings } from "../hooks";

export function LoginPage(): ReactElement {
    const { isLoading, data: settings } = useSettings();
    const { mutateAsync: updateSettings } = useUpdateSettings();

    if (isLoading || !settings) {
        return <div>Loading...</div>;
    }

    const onApiKeyChange = async (
        input: ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        try {
            await updateSettings({
                ...settings,
                itlyApiKey: input.target.value,
            });
        } catch (e) {
            console.log(e);
            message.error("Could not update API key");
        }
    };

    return (
        <PageHeader ghost={false} title="Iterative.ly Auth">
            <Form
                initialValues={{
                    itlyApi: settings.itlyApiKey,
                }}
            >
                <Form.Item name="itlyApi" label="API Key">
                    <Input onChange={onApiKeyChange} />
                </Form.Item>
            </Form>
        </PageHeader>
    );
}
