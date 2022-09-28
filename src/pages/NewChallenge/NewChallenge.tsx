import { Form, Input } from "antd";
import React, { Fragment } from "react";

export const NewChallenge: React.FC<{}> = (props: {}) => {
  return (
    <Form name="new-challenge-form">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input />
      </Form.Item>
    </Form>
  );
};
