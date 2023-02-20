import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import "./CollapsibleSideBar.less";

//Sider on the right
export type CollapsibleSideBarProps = {
  content: JSX.Element;
  border: boolean;
};

export const CollapsibleSideBar: React.FC<CollapsibleSideBarProps> = (
  props
) => {
  const [collapsed, setCollapsed] = useState(true);
  const [content, setContent] = useState<JSX.Element>();
  const getClassName = (border: boolean) => {
    return border
      ? "collapsible-sidebar collapsible-sidebar__border-left"
      : "collapsible__sidebar";
  };

  useEffect(() => {
    if (props.content) {
      setContent(props.content);
    }
  }, [props.content]);

  const onMouseOut = () => {
    setCollapsed(true);
  };
  const onMouseOver = () => {
    setCollapsed(false);
  };

  return (
    <Sider
      onMouseOut={() => onMouseOut()}
      onMouseOver={() => onMouseOver()}
      style={{ background: "transparent" }}
      collapsed={collapsed}
      collapsedWidth="50"
      className={getClassName(props.border)}
    >
      {content}
    </Sider>
  );
};
