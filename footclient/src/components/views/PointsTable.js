import { Row, Dropdown, Col } from "react-bootstrap";
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
    <div>
      <Row className="justify-content-center pb-1">
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
      <div style={{ maxHeight: "60vh", overflow: "auto" }}>
        {matches.length > 0 ? (
          <table className="rankingTable">
            <thead>
              <tr>
                <th>Match</th>
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
                      <td className="results">
                        <Row className="justify-content-center">
                          <Col>
                            <Row sm={12} className="justify-content-center">
                              {match.teamAName}
                            </Row>

                            <Row
                              sm={12}
                              className="justify-content-center font-weight-bold"
                            >
                              {match.teamAResult !== undefined
                                ? match.teamAResult
                                : ""}
                              X
                              {match.teamBResult !== undefined
                                ? match.teamBResult
                                : ""}
                            </Row>

                            <Row sm={12} className="justify-content-center">
                              {match.teamBName}
                            </Row>
                          </Col>
                        </Row>
                      </td>
                      {/*                      <td className="results">
                        <Row>
                          <Col className="p-0 text-right">
                            {match.teamAName}
                          </Col>

                          <Col style={{ fontWeight: "bold" }} className="p-0">
                            {match.teamAResult !== undefined
                              ? match.teamAResult
                              : ""}
                            X
                            {match.teamBResult !== undefined
                              ? match.teamBResult
                              : ""}
                          </Col>

                          <Col className="p-0 text-left">{match.teamBName}</Col>
                        </Row>
                      </td> */}
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
                                      ? `(${found.points})`
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
          <h1 className="text-center">No matches found</h1>
        )}
      </div>
    </div>
  );
};

export default PointsTable;
