import { Row, Pagination } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchTeams from "../functional/FetchTeams";
import RemoveTeam from "../functional/RemoveTeam";

const TeamsTable = (props) => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchTeams(state, dispatch);
      if (state.teams.length > 0) {
        let tempArr = [];
        state.teams.map((value, entry) => {
          if (entry % 10 === 0) {
            tempArr.push(state.teams.slice(entry, entry + 10));
          }
          return null;
        });
        setTeams(tempArr);
      } else {
        setTeams([]);
      }
    }
  }, [state.teams]);

  return (
    <Row className="justify-content-center">
      {teams.length > 0 ? (
        <table className="teamsTable">
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "left" }} colSpan={2}>
                Team
              </th>
            </tr>
          </thead>
          <tbody>
            {teams !== undefined &&
            teams.length > 0 &&
            teams[currentPage] !== undefined ? (
              teams[currentPage].map((val, key) => {
                return (
                  <tr
                    key={key}
                    style={{ backgroundColor: key % 2 ? "white" : "lightgrey" }}
                  >
                    <td style={{ textAlign: "center" }}>
                      {currentPage === 0 ? key + 1 : key + 1 + currentPage * 10}
                    </td>
                    <td>{val.teamName}</td>
                    <td
                      style={{ textAlign: "center" }}
                      className="d-table-cell w-25"
                    >
                      <button
                        style={{
                          backgroundColor: "#25282a",
                          borderRadius: "4px 4px 4px 4px",
                          color: "#efefef",
                          padding: "2px",
                          margin: "2px",
                          fontSize: "0.8em",
                        }}
                        onClick={() => {
                          if (teams[currentPage].length === 1) {
                            if (currentPage !== 0)
                              setCurrentPage(currentPage - 1);
                          }
                          RemoveTeam(val._id, state, dispatch).then(
                            (response) => {
                              if (response.status === 200) {
                                props.notify("Sucessfully Removed Team.");
                              } else {
                                props.notify("Something went wrong.");
                              }
                            }
                          );
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No teams found</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>
                <Row className="justify-content-center m-0 pt-2">
                  {teams.length > 1 ? (
                    <Pagination variant="dark">
                      {teams.map((val, key) => {
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
        <h1>No teams found</h1>
      )}
    </Row>
  );
};

export default TeamsTable;
