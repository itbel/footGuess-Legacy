import React, { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
const AddTeam = () => {
  const [teamName, setTeamName] = useState(undefined);
  return (
    <div
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
          <h1>Add Team</h1>
        </Row>
        <Row className="pt-3">
          <Col sm={0} md={3}></Col>
          <Col sm={12} md={6}>
            <Form
              style={{
                backgroundColor: "#efefef",
                color: "black",
                borderRadius: "4px 4px 4px 4px",
              }}
            >
              <Form.Group>
                <Row className="justify-content-center pt-3">
                  <h3>Team Name:</h3>
                </Row>
                <Row className="justify-content-center pt-3">
                  <Row className="w-50">
                    <Form.Control
                      value={teamName}
                      name="name"
                      onChange={(e) => {
                        setTeamName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter team name"
                    />
                  </Row>
                </Row>
              </Form.Group>
              <Row className="justify-content-center pb-3 pt-3">
                <Button variant="dark">
                  Add
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

export default AddTeam;
