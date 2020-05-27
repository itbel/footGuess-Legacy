import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      style={{
        height: "64px",
        paddingTop: "8px",
      }}
    >
      <Nav className="w-100 justify-content-center">
        <Link className="linkStyle" to="/">
          Home
        </Link>

        <Link className="linkStyle" to="/create">
          Create Tournament
        </Link>

        <Link className="linkStyle" to="/join">
          Join Tournament
        </Link>

        <NavDropdown title="Manage Tournaments" id="nav-dropdown">
          <NavDropdown.Item disabled={true}>Tournament Title</NavDropdown.Item>
          <NavDropdown.Divider />
          <Link disabled={authState.is} to="/addmatch">
            Add Match
          </Link>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link
          className="d-flex justify-content-end"
          onClick={() => {
            dispatch({
              type: "LOGOUT",
            });
          }}
          href="/"
        >
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
