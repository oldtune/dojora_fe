import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Shared/Context/AuthContext";
import { JwtDecode } from "../../../Shared/Misc/Jwt";
import { saveToLocalStorage } from "../../../Shared/Misc/LocalStorage";
import { Message } from "../../../Shared/Misc/Message";
import { User } from "../../../Shared/Models/User";
import { User as UserLogin } from "../User";
import "./Login.less";
import { UserService } from "./User.service";

export const Login: React.FC<{}> = () => {
  let userContext = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (userContext.user && userContext.user.authenticated) {
      setLoginStatus(userContext.user.authenticated);
    }
  }, [userContext]);

  let usernameRef = useRef<any>();
  let passwordRef = useRef<any>();

  const submitForm = async () => {
    const user: UserLogin = {
      username: usernameRef.current.input.value,
      password: passwordRef.current.input.value,
    };

    const loginResult = await UserService.Login(user);
    if (!loginResult.success) {
      Message.error("Wrong username or password!");
      return;
    }

    let userResponse = JwtDecode(loginResult.data as string);

    const userParsed: User = {
      authenticated: userResponse.authenticated,
      username: userResponse.username,
      id: userResponse.id,
    };

    userContext.setUser({ userParsed });
    saveToLocalStorage("USER", JSON.stringify(userParsed));
    saveToLocalStorage("TOKEN", loginResult.data);

    setLoginStatus(true);
  };

  if (loginStatus) {
    console.log("navigate to journal");
    return <Navigate to="/journal" />;
  }

  return (
    <div className="login-container">
      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        onSubmitCapture={() => submitForm()}
      >
        <Form.Item name="username" label="Username" className="label__white">
          <Input ref={usernameRef} />
        </Form.Item>
        <Form.Item label="Password" name="password" className="label__white">
          <Input type="password" ref={passwordRef} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={() => submitForm()}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
