import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Rules = () => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <h1>Rules</h1>
        </Row>
        <Row className="justify-content-center">
          <table
            style={{
              backgroundColor: "#efefef",
              color: "black",
              padding: "4px",
              border: "1px solid black",
            }}
          >
            <thead>
              <tr>
                <th className="p-2">Outcome + Both Results</th>
                <th className="p-2">Outcome Only</th>
                <th className="p-2">Outcome, 1 Result</th>
                <th className="p-2">Wrong Outcome, 1 Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>+10 Points</td>
                <td>+5 Points</td>
                <td>+6 Points</td>
                <td>+1 Point</td>
              </tr>
            </tbody>
          </table>
        </Row>
      </Container>
    </div>
  );
};

export default Rules;
