import "antd/dist/antd.css";

import { Alert, Layout, Tabs } from "antd";
import React, { ReactElement } from "react";
import { MemoryRouter as Router } from "react-router-dom";

import { LogType } from "../../redux/types";
import { LogTable } from "./log-table";

const { ErrorBoundary } = Alert;
const { Content } = Layout;
const { TabPane } = Tabs;

export function App(): ReactElement {
    return (
        <Router>
            <Layout
                style={{
                    minHeight: "100vh",
                    minWidth: "600px",
                }}
            >
                <Content
                    style={{
                        padding: "10px",
                        background: "#fff",
                    }}
                >
                    <ErrorBoundary>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Segment" key="1">
                                <LogTable logType={LogType.SEGMENT} />
                            </TabPane>
                            <TabPane tab="Mixpanel" key="2">
                                <LogTable logType={LogType.MIXPANEL} />
                            </TabPane>
                            <TabPane tab="Amplitude" key="3">
                                <LogTable logType={LogType.AMPLITUDE} />
                            </TabPane>
                        </Tabs>
                    </ErrorBoundary>
                </Content>
            </Layout>
        </Router>
    );
}
