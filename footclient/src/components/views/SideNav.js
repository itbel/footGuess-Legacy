import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../Store";

const SideNav = () => {
  return (
    <Navbar expand="xs" bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Link className="linkStyle" to="/guess">
          Guess
        </Link>
        <Link className="linkStyle" to="/rules">
          Rules
        </Link>
        <Link className="linkStyle" to="/ranking">
          Tournament Ranking
        </Link>
      </Nav>
    </Navbar>
  );
};

export default SideNav;
