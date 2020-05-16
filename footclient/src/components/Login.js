import React, { useState, useContext } from "react";
import Axios from "axios";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { AuthContext } from "../App";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    user: "",
    pass: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  const [register, setRegister] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    if (data.user !== undefined && data.pass !== undefined) {
      Axios.post(
        "http://localhost:3001/users/login",
        {
          username: data.user,
          password: data.pass,
        },
        { timeout: 2000 }
      )
        .then((response) => {
          if (response.data.msg === "Invalid Credentials!") {
          } else {
            console.log("Successfully authenticated.");
            dispatch({
              type: "LOGIN",
              payload: data.user,
            });
          }
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          });
        });
    }
  };
  const RegisterForm = () => {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="user"
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="pass"
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value,
                });
              }}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          {data.errorMessage && (
            <span className="form-error">
              <b>{data.errorMessage}</b>
            </span>
          )}
          <Button className="w-100" variant="info">
            {data.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </Form>
      </>
    );
  };
  const LoginForm = () => {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="user"
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="pass"
              onChange={(e) => {
                setData({
                  ...data,
                  [e.target.name]: e.target.value,
                });
              }}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          {data.errorMessage && (
            <span className="form-error">
              <b>{data.errorMessage}</b>
            </span>
          )}
          <Row className="justify-content-center">
            <Button
              disabled={data.isSubmitting}
              onClick={handleSubmit}
              variant="info"
              className="w-25"
              type="submit"
            >
              {data.isSubmitting ? "Loading..." : "Login"}
            </Button>
            <Button
              onClick={() => setRegister(!register)}
              className="w-25 ml-2"
              variant="info"
            >
              Register
            </Button>
          </Row>
        </Form>
      </>
    );
  };
  return (
    <Container fluid className="login pt-2">
      <div className="spacer"></div>
      <Row className="justify-content-center">
        <Col className="loginForm" xs={10} sm={6} lg={3}>
          {register ? <RegisterForm /> : <LoginForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
