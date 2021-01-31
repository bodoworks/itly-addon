import "antd/dist/antd.css";

import { PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { ReactElement } from "react";
import {
    Link,
    Redirect,
    Route,
    MemoryRouter as Router,
    Switch,
} from "react-router-dom";

import { LogType } from "../../redux/types";
import { FooterContent } from "./footer";
import { LogTable } from "./log-table";

const { Content, Footer, Sider } = Layout;

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
                    <Menu
                        defaultSelectedKeys={[LogType.MIXPANEL]}
                        mode="inline"
                    >
                        <Menu.Item key={LogType.SEGMENT}>
                            <PieChartOutlined />
                            <span>Segment</span>
                            <Link to={`/logs/${LogType.SEGMENT}`} />
                        </Menu.Item>

                        <Menu.Item key={LogType.MIXPANEL}>
                            <PieChartOutlined />
                            <span>Mixpanel</span>
                            <Link to={`/logs/${LogType.MIXPANEL}`} />
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
                        <Switch>
                            <Route exact path="/">
                                <Redirect to={`/logs/${LogType.MIXPANEL}`} />
                            </Route>

                            <Route exact path={`/logs/${LogType.SEGMENT}`}>
                                <LogTable logType={LogType.SEGMENT} />
                            </Route>

                            <Route exact path={`/logs/${LogType.MIXPANEL}`}>
                                <LogTable logType={LogType.MIXPANEL} />
                            </Route>
                        </Switch>
                    </Content>

                    <Footer
                        style={{
                            textAlign: "center",
                            height: "40px",
                            padding: "10px",
                        }}
                    >
                        <FooterContent />
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
}
