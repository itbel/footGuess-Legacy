import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import Axios from "axios";
const Register = (props) => {
  const initialState = {
    user: "",
    pass: "",
    userid: "",
    isSubmitting: false,
    errorMessage: undefined,
    email: "",
    name: "",
  };

  const history = useHistory(props.history);
  const [data, setData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: "",
    });
    if (data.user !== undefined && data.pass !== undefined) {
      Axios.post(
        "http://localhost:3001/users/register",
        {
          username: data.user,
          password: data.pass,
          name: data.name,
          email: data.email,
        },
        { timeout: 2000 }
      )
        .then((response) => {
          console.log("Successfully Registered");
          console.log(response.data);
          setData({
            ...data,
            isSubmitting: false,
          });
          history.push("/");
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
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => {
                  setData({
                    ...data,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={(e) => {
                  setData({
                    ...data,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="text"
                placeholder="Enter email"
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
                {data.isSubmitting ? "Registering..." : "Register"}
              </Button>
              <Button
                onClick={() => {
                  history.push("/");
                }}
                className="w-25 ml-2"
                variant="dark"
              >
                Login
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
