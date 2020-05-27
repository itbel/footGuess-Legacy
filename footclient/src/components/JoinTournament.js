import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { AuthContext } from "../App";
import { Row, Col } from "react-bootstrap";
const JoinTournament = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    let arr = [];
    let entries = Object.entries(authState.joinedTournaments);
    for (let entry of entries) {
      arr.push(entry[1].name);
    }
    setTournaments(arr);
  }, [authState.joinedTournaments, dispatch, setTournaments, authState]);
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "16px 16px 16px 16px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Row className="d-flex justify-content-center">
        <h1>Join Tournament</h1>
      </Row>
      <Row>
        <Col sm={0} md={3}></Col>
        <Col sm={12} md={6}>
          <Table
            size="sm"
            bordered
            hover
            style={{ color: "black", backgroundColor: "#efefef" }}
          >
            <thead>
              <tr>
                <th>Tournament Name</th>
                <th>Join/Leave</th>
              </tr>
            </thead>

            <tbody>
              {authState.allTournaments.map((val, key) => {
                console.log(val.tournamentid);
                return (
                  <tr key={key}>
                    <td className="d-table-cell">{val.name}</td>
                    <td className="d-table-cell">
                      <Button
                        disabled={
                          val.name ===
                          tournaments.find((element) => element === val.name)
                        }
                        onClick={() => {
                          alert(`selected ${val.name}`);
                        }}
                        variant="dark"
                      >
                        Join
                      </Button>
                      <Button
                        style={{ marginLeft: "8px" }}
                        disabled={
                          !(
                            val.name ===
                            tournaments.find((element) => element === val.name)
                          )
                        }
                        onClick={() => {
                          alert(`selected ${val.name}`);
                        }}
                        variant="dark"
                      >
                        Leave
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col sm={0} md={3}></Col>
      </Row>
    </div>
  );
};

export default JoinTournament;
