import Sider from "antd/es/layout/Sider";
import React from "react";
import "./CollapsibleSideBar.less";

export type CollapsibleSideBarProps = {
  content: JSX.Element;
};

export const CollapsibleSideBar: React.FC<CollapsibleSideBarProps> = (
  props
) => {
  return <Sider></Sider>;
};
