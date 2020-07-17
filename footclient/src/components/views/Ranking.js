import React from "react";
import PointsTable from "../views/PointsTable";
import { Row, Col, Container } from "react-bootstrap";

const Ranking = () => {
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
          <h1>Ranking</h1>
        </Row>
        <Row>
          <Col sm={12}>
            <PointsTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ranking;
