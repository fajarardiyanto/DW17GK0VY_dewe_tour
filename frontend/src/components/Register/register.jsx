import React, { useState } from "react";
import "./css/register.css";

import axios from "axios";
import Modals from "../Modal/modal";
import { useMutation, queryCache } from "react-query";
import { Button, Form, Col } from "react-bootstrap";

function Register(props) {
  const [error, setError] = useState("");
  const [formRegister, setFormRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/register",
        formRegister
      );

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("email", res.data.data.email);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      props.setShowRegister(false);
      return res;
    } catch (err) {
      const resError = err.response.data.error.message;
      return setError(resError);
    }
  };

  const [handleAddRegister] = useMutation(handleRegister, {
    onSuccess: () => {
      queryCache.prefetchQuery("users", formRegister);
    },
  });

  const onChange = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRegister();
  };

  return (
    <Modals
      show={props.show}
      onHide={props.onHide}
      headerCss="header-register"
      header={"Register"}
      error={error}
      form={
        <Form onSubmit={(e) => handleSubmit(e)} style={{ marginTop: "50px" }}>
          <Form.Group>
            <Form.Label className="labels">Full Name</Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={formRegister.name}
                onChange={(e) => onChange(e)}
                name="fullName"
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="labels">Email</Form.Label>
            <Col>
              <Form.Control
                type="email"
                value={formRegister.email}
                onChange={(e) => onChange(e)}
                name="email"
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="labels">Password</Form.Label>
            <Col>
              <Form.Control
                type="password"
                value={formRegister.password}
                onChange={(e) => onChange(e)}
                name="password"
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="labels">Phone</Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={formRegister.phone}
                onChange={(e) => onChange(e)}
                name="phone"
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="labels">Address</Form.Label>
            <Col>
              <Form.Control
                className="ctrl"
                as="textarea"
                rows="3"
                value={formRegister.address}
                onChange={(e) => onChange(e)}
                name="address"
              />
            </Col>
          </Form.Group>
          <Button type="submit" variant="default" className="btn6">
            Register
          </Button>
        </Form>
      }
    />
  );
}

export default Register;
