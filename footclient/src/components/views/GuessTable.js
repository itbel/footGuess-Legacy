import { Table, Pagination, Row, Dropdown, Container } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchUserGuesses from "../functional/FetchUserGuesses";
import FetchHighestRound from "../functional/FetchHighestRound";
import AddGuessModal from "../views/AddGuessModal";

const GuessTable = () => {
  const [state] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  /* Temp Force render from child*/
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
      FetchUserGuesses(state, round).then((response) => {
        if (response !== undefined) {
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
  }, [round, state, update]);
  return (
    <Container>
      <Row className="justify-content-center">
        <Dropdown className="pl-2">
          <Dropdown.Toggle size="sm" variant="light">
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
        hover
        striped
        variant="light"
        size="sm"
      >
        <thead>
          <tr>
            <th className="text-center">Match</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {matches !== undefined && matches[currentPage] !== undefined ? (
            matches[currentPage].map((val, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">
                    {val.teamAName} X {val.teamBName}
                  </td>
                  <td>
                    {val.teamAguess} X {val.teamBguess}
                  </td>
                  {typeof val.teamAResult !== undefined &&
                  typeof val.teamBResult !== undefined ? (
                    <td>
                      {val.teamAResult} X {val.teamBResult}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              );
            })
          ) : state.selectedTourId === undefined ? (
            <tr>
              <td>Tournament must be selected</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4}>No Results</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
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
      <Row className="justify-content-center">
        <AddGuessModal handler={handler} round={round}></AddGuessModal>
      </Row>
    </Container>
  );
};

export default GuessTable;
