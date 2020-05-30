import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";

// Views
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Results from "./Results";
import Guess from "./Guess";
import Rules from "./Rules";
import Ranking from "./Ranking";
import AddMatch from "./AddMatch";
import JoinTournament from "./JoinTournament";
import CreateTournament from "./CreateTournament";
import AddTeam from "./AddTeam";

// Functionals
import FetchJoined from "../functional/FetchJoinedTournaments";
import FetchAll from "../functional/FetchAllTournaments";
import FetchOwned from "../functional/FetchOwnedTournaments";

const Dashboard = (props) => {
  const history = useHistory(props.history);
  const { state: authState, dispatch } = useContext(AuthContext);
  const [isLeagueSet, setIsLeagueSet] = useState(false);
  useEffect(() => {
    history.push("/");
    FetchJoined(authState, dispatch);
    FetchAll(dispatch);
    FetchOwned(authState, dispatch);
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
                          history.push("/");
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
                <PrivateRoute path={"/addteam"} component={AddTeam} />
              </Switch>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
