import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    let arr = [];
    let entries = Object.entries(authState.ownedTournaments);
    for (let entry of entries) {
      arr.push(entry[1].name);
    }
    setTournaments(arr);
  }, [authState.ownedTournaments]);
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

        <NavDropdown
          title="Manage Tournament"
          id="nav-dropdown"
          disabled={
            authState.selectedTour === undefined ||
            authState.selectedTour !==
              tournaments.find((element) => element === authState.selectedTour)
          }
        >
          <NavDropdown.Item
            disabled={true}
            className="d-flex justify-content-center font-weight-bold"
            style={{ color: "green" }}
          >
            {authState.selectedTour === undefined ? "" : authState.selectedTour}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <Link
            className="d-flex justify-content-center linkStyleDrop"
            to="/addmatch"
          >
            Add Match
          </Link>
          <NavDropdown.Divider />
          <Link
            className="d-flex justify-content-center linkStyleDrop"
            to="/addmatch"
          >
            View Matches
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
