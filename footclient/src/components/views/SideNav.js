import React, { useContext } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../Store";

const SideNav = (props) => {
  const [state, dispatch] = useContext(Context);

  return (
    <Navbar expand="xs" bg="dark" variant="dark">
      <Navbar.Brand>{state.selectedTourName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNav;
