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

const Results = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);

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
                  <h3>Add Results:</h3>
                  <Dropdown className="pl-2">
                    <Dropdown.Toggle variant="light">Round</Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{ maxHeight: "35vh", overflowY: "auto" }}
                    >
                      <Dropdown.Item>1</Dropdown.Item>
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
                      <tr>
                        <td className="text-right">
                          <h4>Botafogo</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Flamengo</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Fluminense</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Vasco</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Bragantino</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Corinthians</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Sao Paulo</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Santos</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Goias</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Ceara</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Gremio</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Fortaleza</h4>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">
                          <h4>Coritiba</h4>
                        </td>
                        <td className="justify-content-center d-flex">
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                          X
                          <Form.Control
                            size="sm"
                            style={{ width: "10%" }}
                          ></Form.Control>
                        </td>
                        <td className="text-left">
                          <h4>Atletico-MG</h4>
                        </td>
                      </tr>
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
