import React, { useEffect, useState, useContext } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { Context } from "../Store";
import { Row, Col } from "react-bootstrap";
import JoinTournament from "../functional/JoinTournament";
import LeaveTournament from "../functional/LeaveTournament";
import CreateTournamentModal from "../views/CreateTournamentModal";
import RemoveTournament from "../functional/RemoveTournament";

const Tournaments = (props) => {
  const [state, dispatch] = useContext(Context);
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
      <Row className="pt-3 justify-content-center">
        {state.allTournaments.length > 0 ? (
          <Table
            size="sm"
            bordered
            hover
            style={{
              width: "50%",
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
                          JoinTournament(
                            val.tournamentid,
                            state,
                            dispatch
                          ).then((response) => {
                            if (response.status === 204) {
                              props.notify("Sucessfully Joined Tournament.");
                            } else {
                              props.notify("Something went wrong.");
                            }
                          });
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
                          LeaveTournament(
                            val.tournamentid,
                            state,
                            dispatch
                          ).then((response) => {
                            if (response.status === 204) {
                              props.notify("Sucessfully Left Tournament.");
                            } else {
                              props.notify("Something went wrong.");
                            }
                          });
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
                      <Button
                        disabled={
                          state.ownedTournaments.find(
                            (el) => el.name === val.name
                          ) === undefined
                            ? true
                            : false
                        }
                        hidden={
                          state.ownedTournaments.find(
                            (el) => el.name === val.name
                          ) === undefined
                            ? true
                            : false
                        }
                        style={{ marginLeft: "8px" }}
                        variant="danger"
                        onClick={() => {
                          RemoveTournament(
                            val.tournamentid,
                            state,
                            dispatch
                          ).then((response) => {
                            if (response.status === 200) {
                              props.notify("Sucessfully Removed Tournament.");
                            } else {
                              props.notify("Something went wrong.");
                            }
                          });
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
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <Row className="justify-content-center m-0 pt-2">
                    {state.allTournaments.length > 1 ? (
                      <Pagination variant="dark">
                        {state.allTournaments.map((val, key) => {
                          return (
                            <Pagination.Item
                              onClick={() => {
                                setCurrentPage(key);
                              }}
                              active={key === currentPage}
                              key={key}
                            >
                              {key + 1}
                            </Pagination.Item>
                          );
                        })}
                      </Pagination>
                    ) : null}
                  </Row>
                </td>
              </tr>
            </tfoot>
          </Table>
        ) : (
          <h1>No tournaments found</h1>
        )}
      </Row>
      <Row className="justify-content-center">
        <CreateTournamentModal notify={props.notify}></CreateTournamentModal>
      </Row>
    </div>
  );
};

export default Tournaments;
