import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App";
import {
  Dropdown,
  Table,
  Form,
  Col,
  Row,
  Container,
  Button,
} from "react-bootstrap";
import FetchRound from "../functional/FetchRound";

const Results = () => {
  const { state: authState } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  useEffect(() => {
    console.log("Reloading and fetching round");
    FetchRound(authState, round).then((response) => {
      setMatches(response);
      console.log(response);
    });
  }, [round]);
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
          <h1>Results</h1>
        </Row>
        <Row className="pt-3">
          <Col>
            <Form
              style={{
                backgroundColor: "#efefef",
                color: "black",
                borderRadius: "4px 4px 4px 4px",
              }}
            >
              <Form.Group>
                <Row className="justify-content-center pt-3">
                  <Dropdown className="pl-2">
                    <Dropdown.Toggle variant="dark">
                      <b>Selected Round: {round}</b>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{ maxHeight: "35vh", overflowY: "auto" }}
                    >
                      <Dropdown.Item
                        name={1}
                        onClick={(e) => {
                          setRound(e.target.name);
                        }}
                      >
                        1
                      </Dropdown.Item>
                      <Dropdown.Item
                        name={2}
                        onClick={(e) => {
                          setRound(e.target.name);
                        }}
                      >
                        2
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
                <Row className="pt-3 justify-content-center">
                  <Table
                    striped
                    size="sm"
                    hover
                    style={{ width: "80%", padding: "0" }}
                    variant="dark"
                  >
                    <thead>
                      <tr>
                        <th colSpan={4} className="text-center">
                          <h1>Match</h1>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((val, entry) => {
                        return (
                          <tr key={entry}>
                            <td className="text-right">
                              <p>{val.teamAName}</p>
                            </td>
                            <td className="justify-content-center d-flex">
                              <Form.Control
                                onChange={() => {
                                  console.log("hehe");
                                }}
                                value={
                                  val.teamAResult !== undefined
                                    ? val.teamAResult
                                    : ""
                                }
                                size="sm"
                                style={{ width: "10%" }}
                              ></Form.Control>
                              X
                              <Form.Control
                                onChange={() => {
                                  console.log("hehe");
                                }}
                                value={
                                  val.teamBResult !== undefined
                                    ? val.teamBResult
                                    : ""
                                }
                                size="sm"
                                style={{ width: "10%" }}
                              ></Form.Control>
                            </td>
                            <td className="text-left">
                              <p>{val.teamBName}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>
              </Form.Group>
              <Row className="justify-content-center pb-3 pt-3">
                <Button variant="dark">Update</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Results;
