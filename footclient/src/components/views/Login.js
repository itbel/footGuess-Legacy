import React, { useState, useContext } from "react";
import Axios from "axios";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../App";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory(props.history);
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    user: "",
    pass: "",
    userid: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
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
              payload: response.data,
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

  return (
    <Container fluid className="login pt-2">
      <div className="spacer"></div>

      <Row className="justify-content-center">
        <Col className="loginForm" xs={10} sm={6} lg={3}>
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
                variant="dark"
                className="w-25"
                type="submit"
              >
                {data.isSubmitting ? "Loading..." : "Login"}
              </Button>
              <Button
                onClick={() => {
                  history.push("/register");
                }}
                className="w-25 ml-2"
                variant="dark"
              >
                Register
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
