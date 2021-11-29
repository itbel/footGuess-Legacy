import React, { useEffect, useState, useContext } from "react";
import { Button, Pagination } from "react-bootstrap";
import { Context } from "../Store";
import { Row } from "react-bootstrap";
import JoinTournament from "../functional/JoinTournament";
import LeaveTournament from "../functional/LeaveTournament";
import CreateTournamentModal from "../views/CreateTournamentModal";
import RemoveTournament from "../functional/RemoveTournament";
import EndTournament from "../functional/EndTournament";
const Tournaments = (props) => {
  const [state, dispatch] = useContext(Context);
  const [tournaments, setTournaments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let tempArr = [];
    if (state.allTournaments.length > 0) {
      state.allTournaments.map((value, key) => {
        if (key % 5 === 0) {
          tempArr.push(state.allTournaments.slice(key, key + 5));
        }
        return null;
      });
      setTournaments(tempArr);
    } else {
      setTournaments([]);
    }
  }, [state.joinedTournaments, state.allTournaments, state.ownedTournaments]);
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
      <Row className="pt-3 justify-content-center mb-1">
        {tournaments.length > 0 ? (
          <table className="tournamentsTable">
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
              {tournaments !== undefined &&
              tournaments.length > 0 &&
              tournaments[currentPage] !== undefined
                ? tournaments[currentPage].map((val, key) => {
                    return (
                      <tr
                        key={key}
                        style={{
                          backgroundColor: key % 2 ? "white" : "lightgrey",
                        }}
                      >
                        <td className="d-table-cell">{val.name}</td>
                        <td>{val.owner}</td>
                        <td className="d-table-cell">
                          <Button
                            hidden={
                              state.ownedTournaments.find(
                                (el) => el.name === val.name
                              ) === undefined
                                ? false
                                : true
                            }
                            disabled={
                              state.joinedTournaments.find(
                                (el) => el.name === val.name
                              ) === undefined
                                ? false
                                : true
                            }
                            onClick={() => {
                              JoinTournament(
                                val.tournamentid,
                                state,
                                dispatch
                              ).then((response) => {
                                if (
                                  response !== undefined &&
                                  response?.status === 204
                                ) {
                                  props.notify(
                                    "Sucessfully Joined Tournament."
                                  );
                                } else {
                                  if (response?.response?.status === 401)
                                    props.notify("You must login again");
                                  else {
                                    props.notify("Something went wrong.");
                                  }
                                }
                              });
                            }}
                            variant="dark"
                          >
                            Join
                          </Button>
                          <Button
                            style={{ marginLeft: "8px" }}
                            hidden={
                              state.ownedTournaments.find(
                                (el) => el.name === val.name
                              ) === undefined
                                ? false
                                : true
                            }
                            disabled={
                              state.joinedTournaments.find(
                                (el) => el.name === val.name
                              ) === undefined
                                ? true
                                : false
                            }
                            onClick={() => {
                              LeaveTournament(
                                val.tournamentid,
                                state,
                                dispatch
                              ).then((response) => {
                                if (
                                  response !== undefined &&
                                  response.status === 204
                                ) {
                                  props.notify("Sucessfully Left Tournament.");
                                } else {
                                  if (response?.response?.status === 401)
                                    props.notify("You must login again");
                                  else {
                                    props.notify("Something went wrong.");
                                  }
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
                                if (
                                  response !== undefined &&
                                  response.status === 200
                                ) {
                                  props.notify(
                                    "Sucessfully Removed Tournament."
                                  );
                                } else {
                                  if (response?.response?.status === 401)
                                    props.notify("You must login again");
                                  else {
                                    props.notify("Something went wrong.");
                                  }
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
                            variant="success"
                            onClick={() => {
                              EndTournament(val.tournamentid, state, dispatch);
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
                            End
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <Row className="justify-content-center m-0 pt-2">
                    {tournaments.length > 1 ? (
                      <Pagination variant="dark">
                        {tournaments.map((val, key) => {
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
          </table>
        ) : (
          <Row className="justify-content-center m-0 p-1">
            <h3>No tournaments found</h3>
          </Row>
        )}
      </Row>
      <Row className="justify-content-center">
        <CreateTournamentModal notify={props.notify}></CreateTournamentModal>
      </Row>
    </div>
  );
};

export default Tournaments;
