import "antd/dist/antd.css";

import { LockOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactElement } from "react";
import {
    Link,
    Redirect,
    Route,
    HashRouter as Router,
    Switch,
} from "react-router-dom";

import { LoginPage } from "./login";
import { SettingsPage } from "./settings";

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
                >
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="settings" icon={<SettingOutlined />}>
                            <Link to={"/settings"}>Settings</Link>
                        </Menu.Item>
                        <Menu.Item key="itly-login" icon={<LockOutlined />}>
                            <Link to={"/login"}>Itly Login</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
                    <Content
                        style={{ margin: "24px 16px 0", overflow: "initial" }}
                    >
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/settings" />
                            </Route>
                            <Route exact path="/settings">
                                <SettingsPage />
                            </Route>
                            <Route exact path="/login">
                                <LoginPage />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}
