import React from "react";
import { Col, Row, Container, Button, Form } from "react-bootstrap";
const Login = () => {
  return (
    <Container fluid className="login pt-2">
      <Row
        className="justify-content-end"
        style={{ backgroundColor: "#efefef", padding: "16px" }}
      >
        <Row>
          <Button style={{ marginRight: "2vw" }} variant="info">
            Register
          </Button>
        </Row>
      </Row>
      <div className="spacer"></div>
      <Row className="justify-content-center">
        <Col className="loginForm" xs={10} sm={6} lg={3}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <Form>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
              <Button variant="info" className="w-100" type="submit">
                Login
              </Button>
            </Form>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
