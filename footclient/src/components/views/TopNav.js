import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [state, dispatch] = useContext(Context);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    let arr = [];
    let entries = Object.entries(state.ownedTournaments);
    for (let entry of entries) {
      arr.push(entry[1].name);
    }
    setTournaments(arr);
  }, [state.ownedTournaments]);
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
        <Link className="linkStyle" to="/home">
          Home
        </Link>
        <Link className="linkStyle" to="/tournaments">
          Tournaments
        </Link>
        <NavDropdown
          disabled={
            state.selectedTourName === undefined ||
            state.selectedTourName !==
              tournaments.find((element) => element === state.selectedTourName)
          }
          title="Manage Tournaments"
          id="nav-dropdown"
        >
          <NavDropdown.Item
            disabled={true}
            className="d-flex justify-content-center font-weight-bold"
            style={{ color: "green" }}
          >
            {state.selectedTourName === undefined ? "" : state.selectedTourName}
          </NavDropdown.Item>
          <NavDropdown.Divider />

          <Link
            className="d-flex justify-content-center linkStyleDrop"
            to="/teams"
          >
            Teams
          </Link>
          <NavDropdown.Divider />
          <Link
            className="d-flex justify-content-center linkStyleDrop"
            to="/matches"
          >
            Matches
          </Link>
          <NavDropdown.Divider />
          <Link
            className="d-flex justify-content-center linkStyleDrop"
            to="/results"
          >
            Results
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
