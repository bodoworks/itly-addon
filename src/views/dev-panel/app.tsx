import "antd/dist/antd.css";

import Icon from "@ant-design/icons";
import { Alert, Layout, Menu } from "antd";
import React, { ReactElement } from "react";
import {
    Link,
    Redirect,
    Route,
    MemoryRouter as Router,
    Switch,
} from "react-router-dom";

import { LogType } from "../../redux/types";
import { LogTable } from "./log-table";

const { ErrorBoundary } = Alert;
const { Content, Sider } = Layout;

export function App(): ReactElement {
    return (
        <Router>
            <Layout>
                <Sider
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                    }}
                    collapsed={true}
                >
                    <Menu defaultSelectedKeys={[LogType.SEGMENT]} mode="inline">
                        <Menu.Item key={LogType.SEGMENT}>
                            <Icon
                                component={(): ReactElement => (
                                    <img
                                        width="100%"
                                        src="/segment.png"
                                        alt="segment"
                                    />
                                )}
                            />

                            <span>Segment</span>
                            <Link to={`/logs/${LogType.SEGMENT}`} />
                        </Menu.Item>

                        <Menu.Item key={LogType.MIXPANEL}>
                            <Icon
                                component={(): ReactElement => (
                                    <img
                                        width="100%"
                                        src="/mixpanel.png"
                                        alt="mixpanel"
                                    />
                                )}
                            />
                            <span>Mixpanel</span>
                            <Link to={`/logs/${LogType.MIXPANEL}`} />
                        </Menu.Item>

                        <Menu.Item key={LogType.AMPLITUDE}>
                            <Icon
                                component={(): ReactElement => (
                                    <img
                                        width="100%"
                                        src="/mixpanel.png"
                                        alt="amplitude"
                                    />
                                )}
                            />
                            <span>Amplitude</span>
                            <Link to={`/logs/${LogType.AMPLITUDE}`} />
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    style={{
                        minHeight: "100vh",
                        minWidth: "600px",
                        marginLeft: "80px",
                    }}
                >
                    <Content
                        style={{
                            margin: "10px 10px 0px 10px",
                            padding: "10px",
                            background: "#fff",
                        }}
                    >
                        <ErrorBoundary>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to={`/logs/${LogType.SEGMENT}`} />
                                </Route>

                                <Route exact path={`/logs/${LogType.SEGMENT}`}>
                                    <LogTable logType={LogType.SEGMENT} />
                                </Route>

                                <Route exact path={`/logs/${LogType.MIXPANEL}`}>
                                    <LogTable logType={LogType.MIXPANEL} />
                                </Route>

                                <Route
                                    exact
                                    path={`/logs/${LogType.AMPLITUDE}`}
                                >
                                    <LogTable logType={LogType.AMPLITUDE} />
                                </Route>
                            </Switch>
                        </ErrorBoundary>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}
