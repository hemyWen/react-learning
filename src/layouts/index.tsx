import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "@/routers";
import { RouteObject } from "@/routers/interface";

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

type MenuItem = Required<MenuProps>["items"][number];

export default function LayoutIndex() {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setMenuList(getMenu(routes[0].children as RouteObject[]));
  }, []);
  const getMenu = (routeList: RouteObject[], pre = "/"): MenuItem[] => {
    return routeList.map((item) => {
      const menuItem: MenuItem = {
        key: pre + item.path,
        label: item.meta?.title,
        children: item.children ? getMenu(item.children, pre + item.path + "/") : undefined,
      };
      return menuItem;
    });
  };
  const clickMenu = (menuItem: any) => {
    navigate(menuItem.key);
  };
  return (
    <Layout hasSider style={{ backgroundColor: "#fff" }}>
      <Sider style={siderStyle}>
        <Menu theme="dark" mode="inline" items={menuList} onClick={clickMenu} />
      </Sider>
      <Layout style={{ marginInlineStart: 200, backgroundColor: "#fff" }}>
        <Content style={{ fontSize: "16px" }}>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
