import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App";
import ResultsModal from "../views/ResultModal";
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
                <Row className="pt-1 justify-content-center">
                  <Table
                    striped
                    size="sm"
                    hover
                    style={{ width: "50%", padding: "0" }}
                    variant="light"
                  >
                    <thead>
                      <tr>
                        <th colSpan={3} className="text-center">
                          <Dropdown className="pl-2">
                            <Dropdown.Toggle size="sm" variant="light">
                              <b>Round: {round}</b>
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
                        </th>
                        <th></th>
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
                              {val.teamAResult !== undefined
                                ? val.teamAResult
                                : ""}
                              X
                              {val.teamBResult !== undefined
                                ? val.teamBResult
                                : ""}
                            </td>
                            <td className="text-left">
                              <p>{val.teamBName}</p>
                            </td>
                            <td>
                              <ResultsModal selectedMatch={val}></ResultsModal>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Results;
