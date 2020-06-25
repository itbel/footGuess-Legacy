import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";
import { Context } from "../Store";
import { useSpring, animated } from "react-spring";
// Views
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Home from "./Home";
import Guess from "./Guess";
import Rules from "./Rules";
import Ranking from "./Ranking";
import Matches from "./Matches";
import Tournaments from "./Tournaments";
import Teams from "./Teams";
import Results from "./Results";

// Functionals
import FetchAll from "../functional/FetchAllTournaments";
import FetchOwned from "../functional/FetchOwnedTournaments";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const Dashboard = (props) => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });
  const history = useHistory(props.history);
  const [state, dispatch] = useContext(Context);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
  const fetchData = () => {
    FetchJoinedTournaments(state, dispatch);
    FetchAll(dispatch);
    FetchOwned(state, dispatch);
  };
  useEffect(() => {
    fetchData();
    history.push("/home");
  }, [history]);

  return (
    <animated.div style={fade}>
      <div
        className="landing p-0"
        style={{
          backgroundColor: "#131313",
          height: "100vh",
          color: "#efefef",
        }}
      >
        <TopNav></TopNav>
        <div style={{ height: "80px" }}></div>
        <Row className="m-0">
          <Col>
            <Row className="d-flex justify-content-end m-0">
              <Col xs={6}>
                {!isLeagueSet ? <h1>Select a League:&nbsp; </h1> : ""}
              </Col>
              <Col xs={6}>
                <Dropdown className="d-flex mt-2 justify-content-end">
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-basic"
                    drop={"down"}
                  >
                    Tournaments
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {state.joinedTournaments !== undefined
                      ? state.joinedTournaments.map((val, key) => {
                          return (
                            <Dropdown.Item
                              key={key}
                              onClick={() => {
                                history.push("/home");
                                dispatch({
                                  type: "SELECT_TOURNAMENT",
                                  payload: val,
                                });
                                setIsLeagueSet(true);
                              }}
                            >
                              {val.name}
                            </Dropdown.Item>
                          );
                        })
                      : "None"}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col lg={2} className="mt-3">
                {state.selectedTourId !== undefined ? (
                  <SideNav></SideNav>
                ) : null}
              </Col>
              <Col
                sm={12}
                md={12}
                lg={state.selectedTourId !== undefined ? 10 : 12}
                className="mt-3"
              >
                <Switch>
                  <Route path={"/home"} component={Home} />
                  <Route path={"/guess"} component={Guess} />
                  <Route path={"/rules"} component={Rules} />
                  <Route path={"/ranking"} component={Ranking} />
                  <Route path={"/tournaments"} component={Tournaments} />
                  <Route path={"/matches"} component={Matches} />
                  <Route path={"/teams"} component={Teams} />
                  <Route path={"/results"} component={Results} />
                </Switch>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </animated.div>
  );
};

export default Dashboard;
