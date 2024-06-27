import React from "react";
import "./index.scss";
import { Layout as AntdLayout, Menu, Popconfirm, Space } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = AntdLayout;

const MENU_ITEMS = [
  {
    key: "find",
    label: "Find",
    children: [
      {
        key: "/",
        label: "Product List",
      },
    ],
  },
  {
    key: "post",
    label: "Post",
    children: [
      {
        key: "/post",
        label: "My Posts",
      },
      {
        key: "/post/add",
        label: "Add a Post",
      },
    ],
  },
  {
    key: "transaction",
    label: "Transaction",
    children: [
      {
        key: "/transaction",
        label: "Transaction List",
      },
    ],
  },
];

const Layout = () => {
  const location = useLocation();
  const selectedKey = location.pathname; // used to highlight the key when being accessed via url

  const navigate = useNavigate();
  const handleMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  const handleLogout = () => {};

  return (
    <AntdLayout className="ant-layout">
      <Header className="layout-header">
        <img className="logo" src="/logo.png" alt="" />
        <span className="title">Second-hand Marketplace</span>
        <span className="user-info">
          <Space>
            <span className="user-name">username</span>
            <span className="user-logout">
              <Popconfirm
                title="Confirm to exit?"
                okText="Exit"
                cancelText="Cancel"
                onConfirm={handleLogout}
              >
                <LogoutOutlined /> Exit
              </Popconfirm>
            </span>
          </Space>
        </span>
      </Header>
      <AntdLayout>
        <Sider width={200}>
          <Menu
            className="sider-menu"
            mode="inline"
            defaultSelectedKeys={["/"]}
            selectedKeys={selectedKey}
            defaultOpenKeys={["find", "post", "transaction"]}
            items={MENU_ITEMS}
            onClick={handleMenuClick}
          />
        </Sider>
        <AntdLayout className="layout-content">
          <Content className="content-wrapper">
            <Outlet />
          </Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
