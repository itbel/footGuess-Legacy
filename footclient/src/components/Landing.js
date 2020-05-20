import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { AuthContext } from "../App";
import Axios from "axios";
const Landing = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  useEffect(() => {});
  return (
    <div className="landing">
      <h1>Landing Page</h1>
      <h6>
        Welcome {authState.isAuthenticated ? authState.userid : undefined}
      </h6>

      <h6>Tournament: </h6>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>{}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Landing;
