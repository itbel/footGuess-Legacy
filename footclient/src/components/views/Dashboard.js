import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

// Views
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Home from "./Home";
import Guess from "./Guess";
import Rules from "./Rules";
import Ranking from "./Ranking";
import AddMatch from "./AddMatch";
import Tournaments from "./Tournaments";
import CreateTournament from "./CreateTournament";
import Teams from "./Teams";

// Functionals
import FetchJoined from "../functional/FetchJoinedTournaments";
import FetchAll from "../functional/FetchAllTournaments";
import FetchOwned from "../functional/FetchOwnedTournaments";
import FetchTeams from "../functional/FetchTeams(unused)";

const Dashboard = (props) => {
  const history = useHistory(props.history);
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
  const fetchData = () => {
    FetchJoined(authState, dispatch);
    FetchAll(dispatch);
    FetchOwned(authState, dispatch);
  };
  useEffect(() => {
    fetchData();
    history.push("/home");
  }, []);

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
  /////////////// LEAGUE IS NOT SET ON LOAD, FETCHING WITHOUT A SET LEAGUE RETURNS EMPTY
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
                          console.log(
                            "selected league has changed. calling from line 101"
                          );
                          fetchData();
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
                <PrivateRoute path={"/home"} component={Home} exact />
                <PrivateRoute path={"/guess"} component={Guess} />
                <PrivateRoute path={"/rules"} component={Rules} />
                <PrivateRoute path={"/ranking"} component={Ranking} />
                <PrivateRoute path={"/create"} component={CreateTournament} />
                <PrivateRoute path={"/tournaments"} component={Tournaments} />
                <PrivateRoute path={"/addmatch"} component={AddMatch} />
                <PrivateRoute path={"/teams"} component={Teams} />
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
