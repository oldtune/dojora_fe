import {
  UserOutlined,
  PlusOutlined,
  QuestionOutlined,
  HomeOutlined,
  BugOutlined,
} from "@ant-design/icons";
import "./App.less";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { Fragment, useState } from "react";
import { Spinner } from "./Shared/Components/Spinner/Spinner";
import { Link, Outlet } from "react-router-dom";
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
  getItem(<Link to={`/`}>Home</Link>, 1, <HomeOutlined />),
  getItem(<Link to={`/me`}>Me</Link>, 2, <UserOutlined />),
  getItem(<Link to={`/new`}>Create</Link>, 3, <PlusOutlined />),
  getItem(<Link to={`/about`}>About</Link>, 4, <QuestionOutlined />),
  getItem(<Link to={`/bug-report`}>Bug report</Link>, 5, <BugOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

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
