import React, { useState } from "react";

import "../Login/css/login.css";

import axios from "axios";
import Modals from "../Modal/modal";
import { Link } from "react-router-dom";
import Icon from "../../Images/Icon.png";
import Register from "../Register/register";
import DropdownProfil from "../Dropdown/dropdown";
import DropdownAdmin from "../Dropdown/dropdownAdmin";
import { Jumbotron, Button, Form, Col } from "react-bootstrap";
import { useMutation, queryCache } from "react-query";

function HeaderPage() {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [forms, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/login", forms);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      setShow(false);
      return res;
    } catch (err) {
      const resError = err.response.data.error.message;
      return setError(resError);
    }
  };

  const [handleAddLogin] = useMutation(handleLogin, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", forms);
    },
  });

  const onChange = (e) => {
    setForm({ ...forms, [e.target.name]: e.target.value });
  };

  const exitClickLogin = () => {
    setShow(false);
  };

  const onClick = () => {
    setShow(true);
  };

  const isLoggedIn = (e) => {
    e.preventDefault();
    handleAddLogin();
    {
      error && setShow(false);
    }
  };

  const exitClickRegister = () => {
    setShowRegister(false);
  };

  const onClickRegister = () => {
    setShowRegister(true);
  };

  return (
    <div>
      <Jumbotron fluid className="jumbotrons">
        {localStorage.getItem("token") ? (
          <>
            {localStorage.role === "Admin" ? (
              <DropdownAdmin />
            ) : (
              <DropdownProfil />
            )}
          </>
        ) : (
          <>
            <Button variant="flat" className="btn2" onClick={onClick}>
              <p>Login</p>
            </Button>
            <Button variant="flat" className="btn1" onClick={onClickRegister}>
              <p>Register</p>
            </Button>
          </>
        )}

        {/* <Login show={show} onHide={exitClickLogin} /> */}
        <Modals
          show={show}
          onHide={exitClickLogin}
          headerCss="header-login"
          header="Login"
          error={error}
          form={
            <Form>
              <Form.Group style={{ margintTop: "40px" }}>
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
        <Register
          show={showRegister}
          onHide={exitClickRegister}
          setShowRegister={exitClickRegister}
        />
        <Link to="/">
          <img className="logo" src={Icon} alt="Icon" />
        </Link>
      </Jumbotron>
    </div>
  );
}

export default HeaderPage;
