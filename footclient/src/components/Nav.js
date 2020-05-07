import React from "react";

import { Navbar, Row, Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Row className="justify-content-center">
      <Navbar>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar>
    </Row>
  );
};

export default Navigation;
