import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const TopNav = () => {
  return (
    <Navbar
      expand="sm"
      variant="dark"
      bg="dark"
      style={{
        height: "20vh",
        borderRadius: "16px 16px 16px 16px",
      }}
    >
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/nextguess">Next Guess</Nav.Link>
        <Nav.Link href="/results">Results</Nav.Link>
        <Nav.Link href="/rules">Rules</Nav.Link>
        <Nav.Link href="/ranking">All Time Rank</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
