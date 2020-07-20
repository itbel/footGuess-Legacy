import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";
import { Context } from "../Store";
import { useSpring, animated } from "react-spring";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import OverallRanking from "./OverallRanking";
import ReactLoading from "react-loading";

// Functionals
import FetchAll from "../functional/FetchAllTournaments";
import FetchOwned from "../functional/FetchOwnedTournaments";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";
toast.configure();
const notify = (msg) => {
  toast(msg, { position: toast.POSITION.BOTTOM_CENTER });
};
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
      {state.isUpdating ? (
        <ReactLoading
          type={"spin"}
          color={"grey"}
          className="spinner"
          height={"10%"}
          width={"10%"}
        ></ReactLoading>
      ) : null}

      <div
        className="landing p-0"
        style={{
          backgroundColor: "#131313",
          height: "100vh",
          color: "#efefef",
        }}
      >
        <TopNav></TopNav>
        <Row className="m-0 mt-2">
          <Col>
            <Row className="d-flex justify-content-end m-auto">
              <Col xs={6}>
                {!isLeagueSet && state.joinedTournaments.length !== 0 ? (
                  <h5>Select a League: </h5>
                ) : (
                  <h5>
                    {state.selectedTourName !== undefined
                      ? state.selectedTourName
                      : state.joinedTournaments.length === 0
                      ? "No joined leagues"
                      : "Select a League:"}
                  </h5>
                )}
              </Col>
              <Col xs={6}>
                <Dropdown className="d-flex justify-content-end">
                  <Dropdown.Toggle
                    style={{
                      visibility:
                        state.joinedTournaments.length === 0
                          ? "hidden"
                          : "visible",
                    }}
                    size="sm"
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
              <Col lg={2} className="mt-2">
                {state.selectedTourId !== undefined ? (
                  <SideNav></SideNav>
                ) : null}
              </Col>
              <Col
                sm={12}
                md={12}
                lg={state.selectedTourId !== undefined ? 10 : 12}
                className="mt-2"
              >
                <Switch>
                  <Route path={"/home"} component={Home} />
                  <Route
                    path={"/guess"}
                    render={(props) => <Guess notify={notify}></Guess>}
                  />
                  <Route path={"/rules"} component={Rules} />
                  <Route path={"/ranking"} component={Ranking} />
                  <Route
                    path={"/tournaments"}
                    render={(props) => (
                      <Tournaments notify={notify}></Tournaments>
                    )}
                  />
                  <Route
                    path={"/matches"}
                    render={(props) => <Matches notify={notify}></Matches>}
                  />
                  <Route
                    path={"/teams"}
                    render={(props) => <Teams notify={notify}></Teams>}
                  />
                  <Route
                    path={"/results"}
                    render={(props) => <Results notify={notify}></Results>}
                  />
                  <Route path={"/allranking"} component={OverallRanking} />
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
