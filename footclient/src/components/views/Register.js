import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const notify = (msg) => {
  toast(msg, { position: toast.POSITION.BOTTOM_CENTER });
};
const Register = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
  const isValidUser = (user) => {
    let isRequiredLength = user.length >= 4;
    let hasNoWhitespace = !/\s/.test(user);
    let hasNoSymbols = !/[!@#~$%^&*()_+=[{\]};:<>\\|.`/?,-]/.test(user);
    let isAlphanumeric = /^[a-zA-Z0-9]+$/.test(user);
    return (
      isRequiredLength && hasNoWhitespace && hasNoSymbols && isAlphanumeric
    );
  };
  const isValidPass = (pass) => {
    let isRequiredLength = pass.length >= 4;
    let hasNoWhitespace = !/\s/.test(pass);
    return isRequiredLength && hasNoWhitespace;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidUser(data.user)) {
      if (isValidPass(data.pass)) {
        setData({
          ...data,
          isSubmitting: true,
          errorMessage: "",
        });
        Axios.post(
          `${BASE_URL}/api/users/register`,
          {
            username: data.user,
            password: data.pass,
            name: data.name,
            email: data.email,
          },
          { timeout: 2000 }
        )
          .then((response) => {
            setData({
              ...data,
              isSubmitting: false,
            });
            history.push("/");
            notify("Successfully registered.");
          })
          .catch((error) => {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: error.message || error.statusText,
            });
          });
      } else {
        setData({
          ...data,
          errorMessage: "Invalid password.",
        });
      }
    } else {
      setData({
        ...data,
        errorMessage: "Invalid username.",
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
