import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

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
import FetchJoinedTournamentsv2 from "../functional/FetchJoinedTournaments_v2";

const Dashboard = (props) => {
  const history = useHistory(props.history);
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
  const fetchData = () => {
    FetchJoinedTournamentsv2(authState.userid).then((val) => {
      dispatch({ type: "FETCH_JOINED_TOURNAMENTS", payload: val });
    });
    FetchAll(dispatch);
    FetchOwned(authState, dispatch);
  };
  useEffect(() => {
    console.log("Updating from dashboard");
    fetchData();
    history.push("/home");
  }, [history]);

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
          <Row className="d-flex justify-content-end m-0">
            <Col lg={2}></Col>
            <Col>
              {!isLeagueSet ? (
                <h1>Select a League:&nbsp; </h1>
              ) : (
                <h1>{authState.selectedTourName}</h1>
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
  );
};

export default Dashboard;
