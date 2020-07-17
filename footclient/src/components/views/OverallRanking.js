import React from "react";
import RankingTable from "../views/RankingTable";
import { Row, Container, Col } from "react-bootstrap";

const OverallRanking = () => {
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
          <h1>Tournament Ranking</h1>
        </Row>
        <Row>
          <Col sm={12}>
            <RankingTable></RankingTable>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OverallRanking;
