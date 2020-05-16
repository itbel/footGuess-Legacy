import React from "react";
import { Row, Col } from "react-bootstrap";
import { AuthContext } from "../App";
const Landing = () => {
  const { state: authState } = React.useContext(AuthContext);

  return (
    <div className="landing">
      <h1>Landing Page</h1>
      <h6>Welcome {authState.isAuthenticated ? authState.user : undefined}</h6>

      <Col>
        <Row></Row>
      </Col>
    </div>
  );
};

export default Landing;
