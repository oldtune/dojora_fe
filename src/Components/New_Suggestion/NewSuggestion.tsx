import { Button, Form, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";

type NewSuggestionProps = {
  title: String;
  description: String;
};

export const NewSuggestionComponent: React.FC<{}> = (props: {}) => {
  const [suggestion, setSuggestion] = useState<NewSuggestionProps>({
    title: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    // if (submitted) {
    // }
  });

  const onSubmit = (data: NewSuggestionProps) => {
    setSuggestion(data);
  };

  return (
    <Form layout={"vertical"} onFinish={onSubmit}>
      <Form.Item
        label={"Title"}
        name={"title"}
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Description"}
        name={"description"}
        rules={[{ required: true, message: "Description is required" }]}
      >
        <Input />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        Submit
      </Button>
    </Form>
  );
};
