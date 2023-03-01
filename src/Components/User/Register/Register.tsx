import { Button, Col, Form, Input, Row } from "antd";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

export const Register: React.FC = () => {
  const [registerStatus, setUserStatus] = useState(false);

  let usernameRef = useRef<any>();
  let passwordRef = useRef<any>();
  let confirmPasswordRef = useRef<any>();

  const submitForm = async () => {};

  if (registerStatus) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="login-container">
      <Form
        name="login-form"
        labelCol={{ span: 10 }}
        onFinish={() => submitForm()}
      >
        <Form.Item
          name="username"
          label="Username"
          className="label__white"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input ref={usernameRef} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="label__white"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input type="password" ref={passwordRef} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Confirm Password is required" }]}
          label="Confirm Password"
          name="confirm-password"
          className="label__white"
        >
          <Input type="password" ref={confirmPasswordRef} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
