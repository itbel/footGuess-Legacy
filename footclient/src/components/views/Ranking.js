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
      <Container className="p-0">
        <Row className="text-center d-none d-sm-block justify-content-center">
          <h1>Round</h1>
        </Row>
        <PointsTable />
      </Container>
    </div>
  );
};

export default Ranking;
