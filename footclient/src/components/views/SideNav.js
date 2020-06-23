import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <Navbar
      expand="sm"
      variant="dark"
      bg="dark"
      style={{
        height: "25vh",
        borderRadius: "4px 4px 4px 4px",
      }}
    >
      <Nav className="flex-column">
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

export default TopNav;
