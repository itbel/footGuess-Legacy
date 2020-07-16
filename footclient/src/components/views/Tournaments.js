import React, { useEffect, useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { Context } from "../Store";
import { Row, Col } from "react-bootstrap";
import JoinTournament from "../functional/JoinTournament";
import LeaveTournament from "../functional/LeaveTournament";
import CreateTournamentModal from "../views/CreateTournamentModal";

const Tournaments = () => {
  const [state, dispatch] = useContext(Context);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    let arr = [];
    let entries = Object.entries(state.joinedTournaments);
    for (let entry of entries) {
      arr.push(entry[1].name);
    }
    setTournaments(arr);
  }, [state.joinedTournaments]);
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
        <h1>Tournaments</h1>
      </Row>
      <Row className="pt-3">
        <Col sm={0} md={3}></Col>
        <Col sm={12} md={6}>
          <Table
            size="sm"
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
                  <b>Tournament Name</b>
                </th>
                <th>Manager</th>
                <th colSpan={2}>
                  <b>Manage</b>
                </th>
              </tr>
            </thead>

            <tbody>
              {state.allTournaments.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="d-table-cell">{val.name}</td>
                    <td>{val.owner}</td>
                    <td className="d-table-cell">
                      <Button
                        disabled={
                          val.name ===
                          tournaments.find((element) => element === val.name)
                        }
                        onClick={() => {
                          JoinTournament(val.tournamentid, state, dispatch);
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
                          LeaveTournament(val.tournamentid, state, dispatch);
                          if (val.name === state.selectedTourName) {
                            let tour = {};
                            tour.name = undefined;
                            tour.tournamentid = undefined;
                            dispatch({
                              type: "SELECT_TOURNAMENT",
                              payload: tour,
                            });
                          }
                        }}
                        variant="dark"
                      >
                        Leave
                      </Button>
                    </td>
                    <td>
                      <Button
                        disabled={
                          state.ownedTournaments.find(
                            (el) => el.name === val.name
                          ) !== undefined
                            ? true
                            : false
                        }
                        hidden={
                          state.ownedTournaments.find(
                            (el) => el.name === val.name
                          ) !== undefined
                            ? true
                            : false
                        }
                        style={{ marginLeft: "8px" }}
                        variant="danger"
                      >
                        Delete
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
      <Row className="justify-content-center">
        <CreateTournamentModal></CreateTournamentModal>
      </Row>
    </div>
  );
};

export default Tournaments;
