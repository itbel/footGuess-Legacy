import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddTeamModal from "./AddTeamModal";
import TeamsTable from "../views/TeamsTable";
const Teams = () => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "60vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Row className="justify-content-center">
        <h1>Teams</h1>
      </Row>
      <Row className="pt-1">
        <Col sm={12}>
          <TeamsTable></TeamsTable>
        </Col>
      </Row>
      <Row className="justify-content-center mt-1">
        <AddTeamModal></AddTeamModal>
      </Row>
    </div>
  );
};

export default Teams;
