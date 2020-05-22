import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../App";
import Axios from "axios";
import Navigation from "./Navigation";

const Landing = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/tournaments/gettournament",
      {
        userid: authState.userid,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      className="landing"
      style={{ backgroundColor: "lightgrey", height: "100vh" }}
    >
      <Container>
        <Navigation></Navigation>
        <Row>
          <Col sm={2}>
            <Nav
              defaultActiveKey="/home"
              className="flex-column"
              style={{ backgroundColor: "white" }}
            >
              <Nav.Link eventKey="link-0">Home</Nav.Link>
              <Nav.Link eventKey="link-1">Link 1</Nav.Link>
              <Nav.Link eventKey="link-2">Link 2</Nav.Link>
              <Nav.Link eventKey="link-3">Link 3</Nav.Link>
              <Nav.Link eventKey="link-4">Link 4</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Row>
              <Col>
                <h1>Landing Page</h1>
                <h6>
                  {authState.isAuthenticated
                    ? `Welcome ${authState.user}`
                    : undefined}
                </h6>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Tournaments
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {tournaments.map((val) => {
                      console.log(val);
                      return <Dropdown.Item>{val.name}</Dropdown.Item>;
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
