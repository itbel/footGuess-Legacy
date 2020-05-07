import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../App";

const Landing = () => {
  const { dispatch } = useContext(AuthContext);
  return (
    <React.Fragment>
      <h1>Landing Page</h1>
      <Button>Logout</Button>
    </React.Fragment>
  );
};

export default Landing;
