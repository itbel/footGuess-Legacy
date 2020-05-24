import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../App";
import Axios from "axios";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Results from "./Results";
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
      className="landing p-0"
      style={{
        backgroundColor: "#131313",
        height: "100vh",
        color: "#efefef",
      }}
    >
      <TopNav></TopNav>
      <Row className="m-0">
        <Col xs={0} sm={3} md={2} lg={2} xl={1} className="p-0">
          <SideNav></SideNav>
        </Col>
        <Col>
          <Row>
            <Col className="mt-5">
              {!authState.isLeagueSet ? (
                <h1>Select a League: {authState.user}</h1>
              ) : (
                `Selected League ${authState.user}`
              )}
              <Results></Results>
            </Col>
            <Col sm={2} className="mt-5 pt-2">
              <Dropdown className="d-flex justify-content-end mr-4">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  drop={"down"}
                >
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
    </div>
  );
};

export default Landing;
