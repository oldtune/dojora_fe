import { Button, Modal, Row } from "antd";
import React, { Fragment, ReactNode, useState } from "react";

type DialogProps = {
  title?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  esc?: boolean;
  xButton?: boolean;
  visible?: boolean;
};

export const DialogComponent: React.FC<DialogProps> = (props: DialogProps) => {
  const finalProps = props || DefaultProps;
  return (
    <Modal visible={true} title={finalProps.title} footer={finalProps.footer}>
      {finalProps.body}
    </Modal>
  );
};

const DefaultTitle = <Row>Dialog</Row>;

const DefaultBody = <Fragment></Fragment>;

const DefaultFooter = (
  <Fragment>
    <Button type={"primary"} danger>
      Close
    </Button>
  </Fragment>
);

const DefaultProps: DialogProps = {
  title: DefaultTitle,
  body: DefaultBody,
  footer: DefaultFooter,
  visible: false,
};
