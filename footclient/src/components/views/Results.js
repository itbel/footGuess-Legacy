import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import ResultsTable from "./ResultsTable";

const Results = () => {
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
          <h1>Results</h1>
        </Row>
        <Row>
          <Col sm={12}>
            <ResultsTable></ResultsTable>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Results;
