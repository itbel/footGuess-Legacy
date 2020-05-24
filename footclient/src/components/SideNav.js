import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navbar, Nav, Button } from "react-bootstrap";

const TopNav = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      style={{ backgroundColor: "#2b2b2b", height: "100vh" }}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link eventKey="link-1">Next Guess</Nav.Link>
          <Nav.Link eventKey="link-2">Results</Nav.Link>
          <Nav.Link eventKey="link-3">Rules</Nav.Link>
          <Nav.Link eventKey="link-4">All Time Rank</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;
