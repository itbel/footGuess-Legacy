import React, { useEffect, useContext } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { Context } from "../Store";

import AddMatchModal from "../views/AddMatchModal";
import MatchesTable from "./MatchesTable";

const Matches = () => {
  const [state] = useContext(Context);

  useEffect(() => {}, [state.selectedTourId]);

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
      <Container>
        <Row className="justify-content-center">
          <h1>Matches</h1>
        </Row>
        <Row className="pt-3">
          <Col sm={12}>
            <MatchesTable></MatchesTable>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <AddMatchModal />
        </Row>
      </Container>
    </div>
  );
};

export default Matches;
