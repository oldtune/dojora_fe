import { Button, Form, Input } from "antd";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Message } from "../../../Shared/Misc/Message";
import { UserService } from "../Login/User.service";

export const Register: React.FC = () => {
  const [registerStatus, setUserStatus] = useState(false);

  let usernameRef = useRef<any>();
  let passwordRef = useRef<any>();
  let confirmPasswordRef = useRef<any>();

  const submitForm = async () => {
    const response = await UserService.Register({
      username: usernameRef.current.input.value,
      password: passwordRef.current.input.value,
    });

    if (response.success) {
      Message.success("Registration successful!");
      setUserStatus(true);
      return;
    }

    Message.error("Failed to register");
  };

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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
