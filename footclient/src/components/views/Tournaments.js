import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { AuthContext } from "../../App";
import { Row, Col } from "react-bootstrap";
import JoinTournament from "../functional/JoinTournament";

const Tournaments = () => {
  const { state: authState, dispatch } = useContext(AuthContext);
  const [tournaments, setTournaments] = useState([]);
  const leaveTournament = (tournamentid) => {};
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
        borderRadius: "4px 4px 4px 4px",
        minHeight: "50vh",
        maxHeight: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <Row className="d-flex justify-content-center">
        <h1>Tournament</h1>
      </Row>
      <Row className="pt-3">
        <Col sm={0} md={3}></Col>
        <Col sm={12} md={6}>
          <Table
            size="md"
            bordered
            hover
            style={{
              textAlign: "center",
              color: "black",
              backgroundColor: "#efefef",
            }}
          >
            <thead>
              <tr>
                <th>
                  <h3>Tournament Name</h3>
                </th>
                <th className="w-25">
                  <h3>Manage</h3>
                </th>
              </tr>
            </thead>

            <tbody>
              {authState.allTournaments.map((val, key) => {
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
                          JoinTournament(val.tournamentid, authState.userid);
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

export default Tournaments;
