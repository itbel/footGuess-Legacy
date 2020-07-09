import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchRoundResult from "../functional/FetchRoundResult";

const PointsTable = () => {
  const [state] = useContext(Context);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchRoundResult().then((response) => {
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
      });
    }
  }, [state]);
  return (
    <table className="rankingTable">
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
              <tr key={key}>
                <td>
                  {match.teamAName + " "}X{" " + match.teamBName}
                </td>
                <td>
                  {match.teamAResult !== undefined ? (
                    <b>{match.teamAResult}</b>
                  ) : null}
                  X
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
                      <td>
                        {found !== undefined
                          ? `${found.teamAguess} X ${found.teamBguess} ${
                              found.points !== 0 ? `+(${found.points})` : "(0)"
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
          {players.map((player, key2) => {
            let playerPoints = 0;
            for (let i = 0; i < matches.length; i++) {
              for (let x = 0; x < matches[i].guesses.length; x++) {
                if (matches[i].guesses[x].player.name === player) {
                  playerPoints += matches[i].guesses[x].points;
                }
              }
            }
            return <td>{`+${playerPoints}`}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default PointsTable;
