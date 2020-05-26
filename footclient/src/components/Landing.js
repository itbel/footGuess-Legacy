import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown, Container, Nav } from "react-bootstrap";
import { AuthContext } from "../App";
import Axios from "axios";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Results from "./Results";
const Landing = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [selectedTour, setSelectedTour] = useState(undefined);
  const [tournaments, setTournaments] = useState([]);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
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
  }, [isLeagueSet]);
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
      <div style={{ height: "72px" }}></div>
      <Row className="m-0">
        <Col>
          <Row className="d-flex justify-content-end m-0 mr-4">
            <Col lg={3}></Col>
            <Col>
              {!isLeagueSet ? (
                <h1>Select a League:&nbsp; </h1>
              ) : (
                <h1>{selectedTour}</h1>
              )}
            </Col>
            <Col>
              <Dropdown className="d-flex mt-2 justify-content-end">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  drop={"down"}
                >
                  Tournaments
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {tournaments.map((val) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTour(val.name);
                          setIsLeagueSet(true);
                          console.log(isLeagueSet);
                          console.log(selectedTour);
                        }}
                      >
                        {val.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            <Col lg={2} className="mt-3 d-none d-md-block">
              <SideNav></SideNav>
            </Col>
            <Col sm={12} md={12} lg={10} className="mt-3">
              <Results></Results>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;

/*
 <Row>
            <Col sm={2} className="mt-5">
              <h1 style={{ color: "#131313" }}>,</h1>
              <SideNav></SideNav>
            </Col>
            <Col className="mt-5">
              <Row>
                <Col>
                  {!isLeagueSet ? (
                    <h1>Select a League:</h1>
                  ) : (
                    <h1>{selectedTour}</h1>
                  )}
                </Col>
                <Col>
                  <Dropdown
                    className="d-flex justify-content-end mr-4 mt-1"
                    style={{ display: "inline-block" }}
                  >
                    <Dropdown.Toggle
                      variant="dark"
                      id="dropdown-basic"
                      drop={"down"}
                    >
                      Tournaments
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {tournaments.map((val) => {
                        return (
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedTour(val.name);
                              setIsLeagueSet(true);
                              console.log(isLeagueSet);
                              console.log(selectedTour);
                            }}
                          >
                            {val.name}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              */
