import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import GuessTable from "./GuessTable";

const Guess = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <h1>Guesses</h1>
        </Row>
        <Row className="justify-content-center">
          <Col sm={12}>
            <GuessTable notify={props.notify} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Guess;
