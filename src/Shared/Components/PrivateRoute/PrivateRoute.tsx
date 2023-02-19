import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export type PrivateRouteProps = {
  children?: any;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const authContext = useContext(AuthContext);
  if (authContext && authContext.user && !authContext.user.authenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return props.children;
};
