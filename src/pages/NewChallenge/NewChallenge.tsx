import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { NewChallenge } from "../../Components/Challenge";
import { ChallengeService } from "../../Services/Challenge.service";
import { Message } from "../../Shared/Misc/Message";
import { ValidationMessage } from "../../Shared/Misc/Sentence";

export const NewChallengePage: React.FC<{}> = (_) => {
  type NewChallengeProps = NewChallenge;
  const [state, setState] = useState<boolean>(false);
  const [newChallenge, setNewChallenge] = useState<NewChallengeProps>({
    title: "",
    description: "",
  });

  let formRef = useRef(null);

  const createNewChallenge = (data: any) => {
    setNewChallenge(data);
    setState(true);
  };

  useEffect(() => {
    if (state) {
      ChallengeService.addNew(newChallenge).subscribe((_) => {
        Message.info("Challenge created successfully!");
      });
    }
  });

  if (state) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <Row>
      <Col span={22} offset={1} md={{ offset: 4, span: 16 }}>
        <Form layout="vertical" ref={formRef} onFinish={createNewChallenge}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: ValidationMessage("Title is required"),
              },
              {
                min: 10,
                message: ValidationMessage(
                  "Title must be at least 10 characters"
                ),
              },
              {
                max: 1000,
                message: ValidationMessage(
                  "Title should be brief, detail should be in description section"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: ValidationMessage("Description is required"),
              },
              {
                min: 10,
                message: ValidationMessage(
                  "Description must be at least 10 characters"
                ),
              },
              { max: 2000, message: ValidationMessage("This is not an exam") },
            ]}
          >
            <Input.TextArea allowClear={true} showCount={true} rows={10} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
