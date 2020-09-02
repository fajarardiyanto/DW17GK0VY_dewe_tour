import React, { useState } from "react";
import "./css/login.css";

import Modals from "../Modal/modal";
import { Button, Form, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";

const Login = (props) => {
  const location = useLocation();
  const currentPathName = location.pathname;
  const history = useHistory();
  const [forms, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...forms, [e.target.name]: e.target.value });
  };

  const isLoggedIn = (e) => {
    e.preventDefault();
    localStorage.setItem("email", forms.email);
    if (localStorage.email === "admin@gmail.com") {
      history.push("/admin/list-transaction");
    } else {
      history.push(currentPathName);
    }
    console.log(forms);
  };

  return (
    <Modals
      show={props.show}
      onHide={props.onHide}
      headerCss="header-login"
      header="Login"
      form={
        <Form>
          <Form.Group>
            <Form.Label className="labels">Email</Form.Label>
            <Col>
              <Form.Control
                type="email"
                name="email"
                value={forms.email}
                onChange={(e) => onChange(e)}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="labels">Password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                name="password"
                value={forms.password}
                onChange={(e) => onChange(e)}
                className="ctrl"
              />
            </Col>
          </Form.Group>
          <Button variant="default" className="btn6" onClick={isLoggedIn}>
            Login
          </Button>
        </Form>
      }
      footer={
        <Form.Text muted className="textMuted-7">
          <p>Don't have an account? Klik here</p>
        </Form.Text>
      }
    />
  );
};

export default Login;
