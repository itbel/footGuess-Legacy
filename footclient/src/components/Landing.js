import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { AuthContext } from "../App";
import Axios from "axios";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Results from "./Results";
import Guess from "./Guess";
import Rules from "./Rules";
import Ranking from "./Ranking";
import AddMatch from "./AddMatch";
import JoinTournament from "./JoinTournament";
import CreateTournament from "./CreateTournament";

const Landing = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
  useEffect(() => {
    Axios.post(
      "http://localhost:3001/tournaments/getjoinedtournaments",
      {
        userid: authState.userid,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        dispatch({
          type: "FETCH_JOINED_TOURNAMENTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(
      "http://localhost:3001/tournaments/getalltournaments",
      {},
      { timeout: 2000 }
    )
      .then((response) => {
        dispatch({
          type: "FETCH_ALL_TOURNAMENTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.post(
      "http://localhost:3001/tournaments/getownedtournaments",
      { userid: authState.userid },
      { timeout: 2000 }
    )
      .then((response) => {
        dispatch({
          type: "FETCH_OWNED_TOURNAMENTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLeagueSet, authState.userid, dispatch]);

  const PrivateRoute = ({ component: Component, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) =>
          authState.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/"} />
          )
        }
      />
    );
  };

  return (
    <Router>
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
            <Row className="d-flex justify-content-end m-0">
              <Col lg={2}></Col>
              <Col>
                {!isLeagueSet ? (
                  <h1>Select a League:&nbsp; </h1>
                ) : (
                  <h1>{authState.selectedTour}</h1>
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
                    {authState.joinedTournaments.map((val, key) => {
                      return (
                        <Dropdown.Item
                          key={key}
                          onClick={() => {
                            dispatch({
                              type: "SELECT_TOURNAMENT",
                              payload: val.name,
                            });
                            setIsLeagueSet(true);
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
                <Switch>
                  <PrivateRoute path={"/"} component={Results} exact />
                  <PrivateRoute path={"/guess"} component={Guess} />
                  <PrivateRoute path={"/rules"} component={Rules} />
                  <PrivateRoute path={"/ranking"} component={Ranking} />
                  <PrivateRoute path={"/create"} component={CreateTournament} />
                  <PrivateRoute path={"/join"} component={JoinTournament} />
                  <PrivateRoute path={"/addmatch"} component={AddMatch} />
                </Switch>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Router>
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
