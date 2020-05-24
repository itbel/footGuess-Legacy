import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navbar, Nav, Button } from "react-bootstrap";

const TopNav = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <Navbar
      fixed="top"
      style={{
        backgroundColor: "#2b2b2b",
        height: "5vh",
        paddingTop: "16px",
        color: "#efefef",
      }}
    >
      <Nav className="w-100 d-flex justify-content-center">
        <Nav.Link href="#">Home</Nav.Link>
        <Nav.Link href="#">Create Tournament</Nav.Link>
        <Nav.Link href="#">Join Tournament</Nav.Link>
        <Nav.Link href="#">Manage Tournament</Nav.Link>
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