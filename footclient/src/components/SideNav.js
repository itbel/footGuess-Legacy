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
        <Link to="/">Results</Link>
        <Link to="/guess">Next Guess</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/ranking">All Time Rank</Link>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
