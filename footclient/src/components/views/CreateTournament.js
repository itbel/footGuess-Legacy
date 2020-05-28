import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Axios from "axios";
import { AuthContext } from "../../App";

const CreateTournament = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [name, setName] = useState(undefined);
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      "http://localhost:3001/tournaments/createtournament",
      {
        name: name,
        owner: authState.userid,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        alert(`${name} created.`);
        setName("");
        Axios.get(
          "http://localhost:3001/tournaments/gettournaments",
          {},
          { timeout: 2000 }
        )
          .then((response) => {
            dispatch({
              type: "FETCH_ALL_TOURNAMENTS",
              payload: response.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="justify-content-center"
      style={{
        backgroundColor: "#25282A",
        borderRadius: "16px 16px 16px 16px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <h1>Create Tournament</h1>
        </Row>
        <Row className="pt-3">
          <Col sm={0} md={3}></Col>
          <Col sm={12} md={6}>
            <Form
              style={{
                backgroundColor: "#efefef",
                color: "black",
                borderRadius: "16px 16px 16px 16px",
              }}
            >
              <Form.Group>
                <Row className="justify-content-center pt-3">
                  <h3>Tournament Name</h3>
                </Row>
                <Row className="justify-content-center pt-3">
                  <Row className="w-50">
                    <Form.Control
                      value={name}
                      name="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter name"
                    />
                  </Row>
                </Row>
              </Form.Group>
              <Row className="justify-content-center pb-3 pt-3">
                <Button
                  onClick={(event) => handleSubmit(event)}
                  variant="dark"
                  type="submit"
                >
                  Create
                </Button>
              </Row>
            </Form>
          </Col>
          <Col sm={0} md={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateTournament;
