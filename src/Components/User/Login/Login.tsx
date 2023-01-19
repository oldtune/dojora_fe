import { Button, Form, Input } from "antd";
import React, { useRef } from "react";
import { Message } from "../../../Shared/Misc/Message";
import { User } from "../User";
import "./Login.less";
import { UserService } from "./User.service";

export const Login: React.FC<{}> = () => {
  let usernameRef = useRef<any>();
  let passwordRef = useRef<any>();
  const submitForm = async () => {
    const user: User = {
      username: usernameRef.current.input.value,
      password: passwordRef.current.input.value,
    };

    const loginResult = await UserService.Login(user);
    if (!loginResult.success) {
      Message.error("Wrong username or password!");
    }
  };
  return (
    <div className="login-container">
      <Form name="login-form" labelCol={{ span: 8 }}>
        <Form.Item name="username" label="Username" className="label__white">
          <Input ref={usernameRef} />
        </Form.Item>
        <Form.Item label="Password" name="password" className="label__white">
          <Input type="password" ref={passwordRef} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={() => submitForm()}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
