import Sider from "antd/es/layout/Sider";
import React from "react";
import "./CollapsibleSideBar.less";

//Sider on the right
export type CollapsibleSideBarProps = {
  content: JSX.Element;
  border: boolean;
};

export const CollapsibleSideBar: React.FC<CollapsibleSideBarProps> = (
  props
) => {
  const getClassName = (border: boolean) => {
    return border
      ? "collapsible-sidebar collapsible-sidebar__border-left"
      : "collapsible__sidebar";
  };
  return <Sider className={getClassName(props.border)}>{props.content}</Sider>;
};
