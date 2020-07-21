import { Row, Dropdown } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchRoundResult from "../functional/FetchRoundResult";
import FetchHighestRound from "../functional/FetchHighestRound";

const PointsTable = () => {
  const [state, dispatch] = useContext(Context);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [round, setRound] = useState(1);
  const [rounds, setRounds] = useState([]);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchHighestRound(state, state.selectedTourId, dispatch).then(
        (response) => {
          if (response !== undefined && response.length > 0) {
            let tempArr = [];
            for (let i = 1; i <= response[0].round; i++) {
              tempArr.push(i);
            }
            setRounds(tempArr);
          }
        }
      );
      FetchRoundResult(dispatch, state, round, state.selectedTourId).then(
        (response) => {
          if (response !== undefined) {
            setMatches(response);
            let playerArr = [];
            for (let i = 0; i < response.length; i++) {
              //looping matches
              for (let x = 0; x < response[i].guesses.length; x++) {
                //looping match guesses
                if (response[i].guesses[x].player.name !== undefined) {
                  if (!playerArr.includes(response[i].guesses[x].player.name))
                    playerArr.push(response[i].guesses[x].player.name);
                }
              }
            }
            setPlayers(playerArr);
          }
        }
      );
    }
  }, [round]);
  return (
    <>
      <Row className="justify-content-center">
        {matches.length > 0 ? (
          <Dropdown className="pl-2">
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
          <table className="rankingTable" style={{ marginTop: "16px" }}>
            <thead>
              <tr>
                <th>Match</th>
                <th>Result</th>
                {matches !== undefined && players !== undefined
                  ? players.map((entry1, key) => {
                      return <th key={key}>{entry1}</th>;
                    })
                  : null}
              </tr>
            </thead>
            <tbody>
              {matches !== undefined ? (
                matches.map((match, key) => {
                  return (
                    <tr
                      style={{
                        backgroundColor: key % 2 ? "white" : "lightgrey",
                      }}
                      key={key}
                    >
                      <td style={{ textAlign: "center" }} className="results">
                        {match.teamAName} X {match.teamBName}
                      </td>
                      <td className="results">
                        {match.teamAResult !== undefined ? (
                          <b>{match.teamAResult} X </b>
                        ) : null}

                        {match.teamBResult !== undefined ? (
                          <b>{match.teamBResult}</b>
                        ) : null}
                      </td>
                      {players.map((player, key2) => {
                        for (let i = 0; i < players.length; i++) {
                          let found = match.guesses.find(
                            (el) => el.player.name === player
                          );
                          return (
                            <td key={key2} className="results">
                              {found !== undefined
                                ? `${found.teamAguess} X ${found.teamBguess} ${
                                    found.points !== 0
                                      ? `+(${found.points})`
                                      : "(0)"
                                  }`
                                : ""}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Nothing</td>
                </tr>
              )}
              <tr className="font-weight-bold">
                <td className="justify-content-center d-flex">Points</td>
                <td></td>
                {players.map((player, key) => {
                  let playerPoints = 0;
                  for (let i = 0; i < matches.length; i++) {
                    for (let x = 0; x < matches[i].guesses.length; x++) {
                      if (matches[i].guesses[x].player.name === player) {
                        playerPoints += matches[i].guesses[x].points;
                      }
                    }
                  }
                  return (
                    <td
                      key={key}
                      className="text-center"
                    >{`+${playerPoints}`}</td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        ) : (
          <h1>No matches found</h1>
        )}
      </Row>
    </>
  );
};

export default PointsTable;
