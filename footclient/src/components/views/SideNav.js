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
        borderRadius: "16px 16px 16px 16px",
      }}
    >
      <Nav defaultActiveKey="/home" className="flex-column">
        <Link className="linkStyle" to="/">
          Results
        </Link>
        <Link className="linkStyle" to="/guess">
          Next Guess
        </Link>
        <Link className="linkStyle" to="/rules">
          Rules
        </Link>
        <Link className="linkStyle" to="/ranking">
          All Time Rank
        </Link>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
