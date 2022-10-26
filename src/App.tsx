import {
  UserOutlined,
  PlusOutlined,
  QuestionOutlined,
  HomeOutlined,
  BugOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import "./App.less";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Spinner } from "./Shared/Components/Spinner/Spinner";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className: "menu-item ant-menu-item--no-margin",
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to={`/`}>Home</NavLink>, "/", <HomeOutlined />),
  getItem(<NavLink to={`/me`}>Me</NavLink>, "/me", <UserOutlined />),
  getItem(<NavLink to={`/new`}>Create</NavLink>, "/new", <PlusOutlined />),
  getItem(
    <NavLink to={`/about`}>About</NavLink>,
    "/about",
    <QuestionOutlined />
  ),
  getItem(
    <NavLink to={`/bug-report`}>Bug report</NavLink>,
    "/bug-report",
    <BugOutlined />
  ),
  getItem(
    <NavLink to={`/suggest-feature`}>Suggest Feature</NavLink>,
    6,
    <ExperimentOutlined />
  ),
];

const App: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <Fragment>
      <Spinner show={false} />
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={true}
          collapsedWidth="50px"
          className="menu-sider menu-sider-refined"
        >
          <Menu
            selectedKeys={selectedKeys}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default App;
