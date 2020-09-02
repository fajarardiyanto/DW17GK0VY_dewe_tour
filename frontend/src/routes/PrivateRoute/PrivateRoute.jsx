import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const { token, role } = localStorage;
  if (token) {
    if (role === "Admin") {
      return <Route path={props.path} component={props.component} />;
    } else {
      return <Redirect to="/" />;
    }
  }

  return <Redirect to="/" />;
}

export default PrivateRoute;
