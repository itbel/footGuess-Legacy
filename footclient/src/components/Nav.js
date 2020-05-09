import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Navbar, Nav, Button } from "react-bootstrap";

const Navigation = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <Navbar className="w-100" style={{ backgroundColor: "#efefef" }}>
      <Nav className=" w-100">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav className="justify-content-end">
          <Button
            onClick={() => {
              dispatch({
                type: "LOGOUT",
              });
            }}
            href="/"
          >
            Logout
          </Button>
        </Nav>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
