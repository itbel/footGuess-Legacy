import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import ResultsModal from "./ResultModal";
import { Dropdown, Pagination, Row } from "react-bootstrap";
import FetchRound from "../functional/FetchRound";
import FetchHighestRound from "../functional/FetchHighestRound";

const ResultsTable = () => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  /* Temp Force render from child
     Is not functioning at all times
  */

  const [update, setUpdate] = useState(false);
  const handler = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchHighestRound(state.selectedTourId, dispatch).then((response) => {
        if (response !== undefined && response.length > 0) {
          let tempArr = [];
          for (let i = 1; i <= response[0].round; i++) {
            tempArr.push(i);
          }
          setRounds(tempArr);
        }
      });
      FetchRound(state, round, dispatch).then((response) => {
        if (response !== undefined && response.length > 0) {
          let tempArr = [];
          response.map((value, entry) => {
            if (entry % 10 === 0) {
              tempArr.push(response.slice(entry, entry + 10));
            }
            return null;
          });
          setMatches(tempArr);
        } else {
          setMatches([]);
        }
      });
    }
  }, [round, update]);
  return (
    <>
      <Row className="justify-content-center">
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
      </Row>
      <Row className="justify-content-center">
        <table className="resultsTable">
          <thead>
            <tr>
              <th className="text-right">Team A</th>
              <th>&nbsp;</th>
              <th className="text-left">Team B</th>
            </tr>
          </thead>
          <tbody>
            {matches !== undefined && matches[currentPage] !== undefined ? (
              matches[currentPage].map((val, entry) => {
                return (
                  <tr key={entry}>
                    <td className="text-right">{val.teamAName}</td>
                    <td style={{ textAlign: "center" }}>
                      {val.teamAResult !== undefined ? val.teamAResult : ""}X
                      {val.teamBResult !== undefined ? val.teamBResult : ""}
                    </td>
                    <td className="text-left">{val.teamBName}</td>
                    <td>
                      <ResultsModal
                        handler={handler}
                        selectedMatch={val}
                      ></ResultsModal>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No Results</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
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
                  ) : null}
                </Row>
              </td>
            </tr>
          </tfoot>
        </table>
      </Row>
    </>
  );
};

export default ResultsTable;
