import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <Row className="m-0">
      <Col className="sideNav">
        <div>
          <Link className="side" to="/guess">
            Guess
          </Link>
          <Link className="side" to="/rules">
            Rules
          </Link>
          <Link className="side" to="/ranking">
            Round
          </Link>
          <Link className="side" to="/allranking">
            Ranking
          </Link>
          <Link className="side" to="/winranking">
            Wins
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default SideNav;
