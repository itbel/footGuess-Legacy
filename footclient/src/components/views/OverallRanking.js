import React from "react";
import RankingTable from "../views/RankingTable";
import { Row } from "react-bootstrap";

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
      <Row className="justify-content-center">
        <h1>Tournament Ranking</h1>
      </Row>
      <RankingTable></RankingTable>
    </div>
  );
};

export default OverallRanking;
