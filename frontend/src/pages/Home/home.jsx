import React, { useState } from "react";
import "./css/header.css";

import Icon from "../../Images/Icon.png";

import axios from "axios";
import Cards from "./card";
import { useMutation, queryCache } from "react-query";
import Modals from "../../components/Modal/modal";
import Footer from "../../components/Footer/footer";
import GroupTourList from "../../components/Home/groupTourList";
import Register from "../../components/Register/register";
import { Jumbotron, Button, Form, Col } from "react-bootstrap";
import DropdownProfil from "../../components/Dropdown/dropdown";
import DropdownAdmin from "../../components/Dropdown/dropdownAdmin";

function Home() {
  const title1 = "Explore";
  const title2 = "your amazing city together";
  const title3 = "Find great places to holliday";

  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
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

      setShowLogin(false);
      return res;
    } catch (err) {
      const resError = err.response.data.error.message;
      return setError(resError);
    }
  };

  const [handleAddLogin] = useMutation(handleLogin, {
    onSuccess: () => {
      queryCache.prefetchQuery("forms", forms);
    },
  });

  const onChange = (e) => {
    setForm({ ...forms, [e.target.name]: e.target.value });
  };

  const exitClickLogin = () => {
    setShowLogin(false);
  };

  const onClickLogin = () => {
    setShowLogin(true);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    handleAddLogin();
  };

  const exitClickRegister = () => {
    setShowRegister(false);
  };

  const onClickRegister = () => {
    setShowRegister(true);
  };

  return (
    <div>
      <Jumbotron fluid className="jumbotron">
        <img className="logo" src={Icon} alt="Icon" />
        {localStorage.role ? (
          <>
            {localStorage.role === "Admin" ? (
              <DropdownAdmin />
            ) : (
              <DropdownProfil />
            )}
          </>
        ) : (
          <>
            <Button variant="flat" className="btn2" onClick={onClickLogin}>
              <p>Login</p>
            </Button>
            <Button variant="flat" className="btn1" onClick={onClickRegister}>
              <p>Register</p>
            </Button>
          </>
        )}
        <Register
          show={showRegister}
          onHide={exitClickRegister}
          setShowRegister={exitClickRegister}
        />

        <Modals
          show={showLogin}
          onHide={exitClickLogin}
          headerCss="header-login"
          header="Login"
          error={error}
          form={
            <Form onSubmit={(e) => handleSubmitLogin(e)}>
              <Form.Group>
                <Form.Label className="labels">Email</Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    value={forms.email}
                    onChange={(e) => onChange(e)}
                    name="email"
                  />
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label className="labels">Password</Form.Label>
                <Col>
                  <Form.Control
                    className="ctrl"
                    type="password"
                    value={forms.password}
                    onChange={(e) => onChange(e)}
                    name="password"
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="default" className="btn6">
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

        <h1 className="title1">{title1}</h1>
        <h1 className="title2">{title2}</h1>
        <h1 className="title3">{title3}</h1>

        <Search />
      </Jumbotron>
      <Cards />
      <GroupTourList titles={"Group Tour"} />
      <Footer />
    </div>
  );
}

function Search() {
  return (
    <div className="search">
      <Form.Row inline="true" className="form">
        <Col lg={12}>
          <Form.Control className="form-search" />
        </Col>
        <Col lg="auto">
          <Button variant="flat" className="btn9">
            <p>Seacrh</p>
          </Button>
        </Col>
      </Form.Row>
    </div>
  );
}

export default Home;
