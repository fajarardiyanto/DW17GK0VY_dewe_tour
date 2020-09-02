import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateAuth(props) {
  const { token, role } = localStorage;
  if (token) {
    if (role === "User") {
      return <Route exact path={props.path} component={props.component} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <Redirect to="/" />;
}

export default PrivateAuth;
