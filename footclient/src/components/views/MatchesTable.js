import { Row, Pagination, Dropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import FetchMatches from "../functional/FetchMatches";
import { Context } from "../Store";
import RemoveMatch from "../functional/RemoveMatch";
import FetchTeams from "../functional/FetchTeams";
import FetchHighestRound from "../functional/FetchHighestRound";

const MatchesTable = () => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchHighestRound(state.selectedTourId, dispatch).then((response) => {
        if (response !== undefined && response.length > 0) {
          let tempArr = [];
          for (let i = 1; i <= response[0].round; i++) {
            tempArr.push(i);
          }
          setRounds(tempArr);
        } else {
          setRounds([]);
        }
      });
      if (state.teams.length === 0) FetchTeams(state, dispatch);
      FetchMatches(state, dispatch, round);
      if (state.matches.length > 0) {
        let tempArr = [];
        state.matches.map((value, entry) => {
          if (entry % 10 === 0) {
            tempArr.push(state.matches.slice(entry, entry + 10));
          }
          return null;
        });
        setMatches(tempArr);
      } else {
        setMatches([]);
      }
    }
  }, [state.matches, round]);

  return (
    <>
      <Row className="justify-content-center">
        {matches.length > 0 ? (
          <Dropdown>
            <Dropdown.Toggle
              style={{
                visibility: rounds.length === 0 ? "hidden" : "visible",
              }}
              size="sm"
              variant="light"
            >
              <b>Round: {round}</b>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "35vh", overflowY: "auto" }}>
              {rounds.map((val, key) => {
                return (
                  <Dropdown.Item
                    key={key}
                    name={val}
                    onClick={(e) => {
                      setCurrentPage(0);
                      setRound(parseInt(e.target.name));
                    }}
                  >
                    {val}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </Row>
      <Row className="justify-content-center">
        {matches.length > 0 ? (
          <table className="matchesTable">
            <thead>
              <tr>
                <th
                  style={{ borderRight: "1px solid black" }}
                  className="text-center"
                >
                  #
                </th>
                <th className="text-right">Team A</th>
                <th className="text-center">X</th>
                <th className="text-left">Team B</th>
              </tr>
            </thead>
            <tbody>
              {matches !== undefined &&
              matches.length > 0 &&
              matches[currentPage] !== undefined ? (
                matches[currentPage].map((val, key) => {
                  return (
                    <tr
                      style={{
                        backgroundColor: key % 2 ? "white" : "lightgrey",
                      }}
                      key={key}
                    >
                      <td
                        className="text-center"
                        style={{ borderRight: "1px solid black" }}
                      >
                        {currentPage === 0
                          ? key + 1
                          : key + 1 + currentPage * 5}
                      </td>
                      <td className="text-right">{val.teamAName}</td>
                      <td className="text-center">X</td>
                      <td className="text-left">{val.teamBName}</td>
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
                            if (matches[currentPage].length === 1) {
                              if (currentPage !== 0)
                                setCurrentPage(currentPage - 1);
                            }
                            RemoveMatch(val._id, state, dispatch, round);
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
                  <td colSpan={4}>No matches found</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <Row className="justify-content-center m-0 pt-2">
                    {matches.length > 1 ? (
                      <Pagination variant="dark">
                        {matches.map((val, key) => {
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
                    ) : (
                      " "
                    )}
                  </Row>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <h1>No matches found</h1>
        )}
      </Row>
    </>
  );
};

export default MatchesTable;
