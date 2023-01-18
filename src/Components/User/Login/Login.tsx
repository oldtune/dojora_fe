import React, { Fragment, useEffect } from "react";
import "./Login.less";

export const Login: React.FC<{}> = () => {
  useEffect(() => {});
  return (
    <Fragment>
      <div className="login-container">
        <div className="login-form">
          <div
            id="g_id_onload"
            data-client_id="323333196530-h1ab09jk0gnnbp28otf6vbpbf2m8tv0s.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:3000/authorise"
            data-auto_select="true"
            data-itp_support="true"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="filled_blue"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div>
      </div>
    </Fragment>
  );
};
