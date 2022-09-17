import {
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import "./App.less";
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Home } from './pages/Home/Home';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className: "menu-item ant-menu-item--no-margin"
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Me', '1', <UserOutlined />),
  getItem('Create', '2', <PlusOutlined />)
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsed={true} collapsedWidth="50px" className="menu-sider menu-sider-refined">
        {/* <div className="logo" /> */}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Home />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Dojora Project</Footer> */}
      </Layout>
    </Layout>
  );
};

export default App;