import React, { useEffect, useContext, useState } from "react";
import {
  Dropdown,
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
} from "react-bootstrap";
import Axios from "axios";
import { AuthContext } from "../../App";
import AddMatch from "../functional/AddMatch";
import RemoveMatch from "../functional/RemoveMatch";

const Matches = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [round, setRound] = useState(0);
  const [slicedData, setSlicedData] = useState([]);
  // DISPATCH OUTSIDE OF USEFFECT!
  useEffect(() => {
    console.log(matches);
    console.log("Updating Matches Component");
    Axios.post(
      "http://localhost:3001/teams/getteams",
      {
        tourid: authState.selectedTourId,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        let arr = [];
        let entries = Object.entries(response.data);
        for (let entry of entries) {
          arr.push(entry[1]);
        }
        setTeams(arr);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.post(
      "http://localhost:3001/matches/allmatches",
      {
        tournamentid: authState.selectedTourId,
      },
      { timeout: 2000 }
    )
      .then((response) => {
        if (response.data.length > 0) {
          let arr = [];
          let entries = Object.entries(response.data);
          for (let entry of entries) {
            arr.push(entry[1]);
          }
          setMatches(arr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "60vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <h1>Matches</h1>
        </Row>
        <Row className="pt-3">
          <Col sm={12} md={6}>
            <Form
              style={{
                backgroundColor: "#efefef",
                color: "black",
                borderRadius: "4px 4px 4px 4px",
              }}
            >
              <Form.Group>
                <Row className="justify-content-center pt-3">
                  <h3>Add Match:</h3>
                </Row>
                <Row className="ml-3 pt-3">
                  <Col>
                    Select Team 1
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {teamA === "" ? "Team 1" : teamA}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {teams.map((val, key) => {
                          if (teamA === val.teamName || teamB === val.teamName)
                            return null;
                          else
                            return (
                              <Dropdown.Item
                                key={key}
                                onClick={() => {
                                  setTeamA(val.teamName);
                                }}
                              >
                                {val.teamName}
                              </Dropdown.Item>
                            );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    Select Team 1
                    <Dropdown>
                      <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {teamB === "" ? "Team 2" : teamB}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {teams.map((val, key) => {
                          if (teamA === val.teamName || teamB === val.teamName)
                            return null;
                          else
                            return (
                              <Dropdown.Item
                                key={key}
                                onClick={() => {
                                  setTeamB(val.teamName);
                                }}
                              >
                                {val.teamName}
                              </Dropdown.Item>
                            );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col>
                    Round
                    <Form.Control
                      value={round}
                      name="round"
                      onChange={(e) => {
                        setRound(e.target.value);
                      }}
                      className="justify-content-start pt-0"
                      style={{ width: "40%" }}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Row className="justify-content-center pb-3 pt-3">
                <Button
                  onClick={() => {
                    AddMatch(teamA, teamB, round, authState, dispatch);
                    dispatch({
                      type: "UPDATE_MATCHES",
                    });
                  }}
                  variant="dark"
                >
                  Add
                </Button>
              </Row>
            </Form>
          </Col>
          <Col sm={12} md={6}>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>Team 1</th>
                  <th>Team 2</th>
                  <th colSpan="2">Round</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((val, key) => {
                  console.log(matches);
                  return (
                    <tr key={key}>
                      <td>{val.teamAName}</td>
                      <td>{val.teamBName}</td>
                      <td>{val.round}</td>
                      <td className="d-table-cell w-25">
                        <Button
                          variant="dark"
                          onClick={() => {
                            RemoveMatch(val._id, dispatch);
                            dispatch({
                              type: "UPDATE_MATCHES",
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Matches;
