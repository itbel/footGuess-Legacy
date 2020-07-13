import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import ResultsModal from "./ResultModal";
import { Dropdown, Pagination, Row, Table, Container } from "react-bootstrap";
import FetchRound from "../functional/FetchRound";
import FetchHighestRound from "../functional/FetchHighestRound";

const ResultsTable = () => {
  const [state] = useContext(Context);
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
      FetchHighestRound(state.selectedTourId).then((response) => {
        if (response !== undefined && response.length > 0) {
          let tempArr = [];
          for (let i = 1; i <= response[0].round; i++) {
            tempArr.push(i);
          }
          setRounds(tempArr);
        }
      });
      FetchRound(state, round).then((response) => {
        if (response !== undefined && response.length > 0) {
          let tempArr = [];
          response.map((value, entry) => {
            if (entry % 5 === 0) {
              tempArr.push(response.slice(entry, entry + 5));
            }
            return null;
          });
          setMatches(tempArr);
        } else {
          setMatches([]);
        }
      });
    }
  }, [round, currentPage, update]);
  return (
    <Container>
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
      <Table
        style={{ marginTop: "16px" }}
        responsive
        striped
        hover
        variant="light"
        size="sm"
      >
        <tbody>
          {matches !== undefined && matches[currentPage] !== undefined ? (
            matches[currentPage].map((val, entry) => {
              return (
                <tr key={entry}>
                  <td className="text-right">
                    <p>{val.teamAName}</p>
                  </td>
                  <td className="justify-content-center d-flex">
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
              <Row className="justify-content-center m-0">
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
              </Row>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default ResultsTable;
