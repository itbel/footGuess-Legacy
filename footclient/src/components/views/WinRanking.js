import React from "react";
import TotalWins from "./TotalWins";
import { Col, Row, Container } from "react-bootstrap";
const WinRanking = () => {
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
          <h1>Total Wins Ranking</h1>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4} sm={12}>
            <TotalWins></TotalWins>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WinRanking;
