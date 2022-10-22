import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { NewChallenge } from "../../Components/Challenge";
import { ChallengeService } from "../../Services/Challenge.service";

export const NewChallengeComponent: React.FC<{}> = (_) => {
  type NewChallengeProps = NewChallenge;
  const [newChallenge, setNewChallenge] = useState<NewChallengeProps>({
    title: "",
    description: "",
  });

  let formRef = useRef(null);

  const createNewChallenge = (data: any) => {
    setNewChallenge(data);
  };

  useEffect(() => {
    if (newChallenge && newChallenge.title && newChallenge.description) {
      ChallengeService.addNew(newChallenge).subscribe((_) => {
        console.log("created");
      });
    }
  });

  return (
    <Form layout="vertical" ref={formRef} onFinish={createNewChallenge}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
