import { Pagination, Row, Dropdown } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchUserGuesses from "../functional/FetchUserGuesses";
import FetchHighestRound from "../functional/FetchHighestRound";
import AddGuessModal from "../views/AddGuessModal";
import FetchLatestRound from "../functional/FetchLatestRound";

const GuessTable = (props) => {
  const [state, dispatch] = useContext(Context);
  const [currentPage, setCurrentPage] = useState(0);
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      if (initialLoad) {
        FetchLatestRound(state, dispatch);
        setRound(state.latestRound);
        if (state.latestRound !== undefined) setInitialLoad(false);
      }
      FetchHighestRound(state, state.selectedTourId, dispatch).then(
        (response) => {
          if (
            response !== undefined &&
            response.length > 0 &&
            response.status !== 401
          ) {
            let tempArr = [];
            for (let i = 1; i <= response[0].round; i++) {
              tempArr.push(i);
            }
            setRounds(tempArr);
            FetchUserGuesses(dispatch, state, round);
            if (state.guesses !== undefined) {
              let tempArr = [];
              state.guesses.map((value, entry) => {
                if (entry % 10 === 0) {
                  tempArr.push(state.guesses.slice(entry, entry + 10));
                }
                return null;
              });
              setMatches(tempArr);
            } else {
              setMatches([]);
            }
          }
        }
      );
    }
  }, [round, state.latestRound, state.guesses]);
  return (
    <>
      <Row className="justify-content-center">
        <Dropdown className="pl-2">
          <Dropdown.Toggle
            style={{
              visibility: rounds.length === 0 ? "hidden" : "visible",
            }}
            disabled={rounds.length === 0}
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
        {matches.length > 0 ? (
          <table className="guessTable">
            <thead>
              <tr>
                <th>#</th>
                <th className="text-center">Match</th>
                <th>Guess</th>
              </tr>
            </thead>
            <tbody>
              {matches !== undefined && matches[currentPage] !== undefined ? (
                matches[currentPage].map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>
                        {currentPage === 0
                          ? key + 1
                          : key + 1 + currentPage * 10}
                      </td>
                      <td className="text-center">
                        {val.teamAName + " "}
                        <b>
                          {typeof val.teamAResult !== undefined
                            ? val.teamAResult
                            : null}
                          X
                          {typeof val.teamBResult !== undefined
                            ? val.teamBResult
                            : null}
                        </b>
                        {" " + val.teamBName}
                      </td>
                      <td>
                        {val.teamAguess} X {val.teamBguess}
                      </td>
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
        ) : (
          <h3>No guesses found</h3>
        )}
      </Row>
      <Row className="justify-content-center pt-1">
        <AddGuessModal notify={props.notify} round={round}></AddGuessModal>
      </Row>
    </>
  );
};

export default GuessTable;
