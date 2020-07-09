import React, { useContext } from "react";
import { Navbar, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <Row className="m-0 sideNav">
      <Link className="side" to="/guess">
        Guess
      </Link>
      <Link className="side" to="/rules">
        Rules
      </Link>
      <Link className="side" to="/ranking">
        Tournament Ranking
      </Link>
    </Row>
  );
};

export default SideNav;
