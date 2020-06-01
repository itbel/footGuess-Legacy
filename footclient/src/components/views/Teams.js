import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import { Row, Col, Form, Button, Container, Table } from "react-bootstrap";
import AddTeam from "../functional/AddTeam";
import RemoveTeam from "../functional/RemoveTeam";

const Teams = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [teamName, setTeamName] = useState(undefined);
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    let arr = [];
    let entries = Object.entries(authState.teams);
    for (let entry of entries) {
      arr.push(entry[1].teamName);
    }
    setTeamNames(arr);
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
          <h1>Teams</h1>
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
                  <h3>Team Name:</h3>
                </Row>
                <Row className="justify-content-center pt-3">
                  <Row className="w-50">
                    <Form.Control
                      value={teamName}
                      name="name"
                      onChange={(e) => {
                        setTeamName(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter team name"
                    />
                  </Row>
                </Row>
              </Form.Group>
              <Row className="justify-content-center pb-3 pt-3">
                <Button
                  onClick={(event) => {
                    AddTeam(authState.selectedTourId, teamName, dispatch);
                  }}
                  variant="dark"
                >
                  Add
                </Button>
              </Row>
            </Form>
          </Col>
          <Col sm={12} md={6}>
            <Table
              style={{ textAlign: "center" }}
              striped
              bordered
              hover
              size="sm"
              variant="light"
            >
              <thead>
                <tr>
                  <th colspan="2">
                    <h3>Team Name</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamNames.map((val, key) => {
                  console.log(val);
                  return (
                    <tr key={key}>
                      <td className="d-table-cell">{val}</td>
                      <td className="d-table-cell w-25">
                        <Button
                          variant="dark"
                          onClick={() => {
                            RemoveTeam(
                              authState.selectedTourId,
                              val,
                              authState,
                              dispatch
                            );
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

export default Teams;
