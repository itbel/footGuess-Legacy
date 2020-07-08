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
    <Container>
      <Table striped hover variant="light">
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
                <tr key={key}>
                  <td>
                    {match.teamAName}
                    {match.teamAResult !== undefined ? match.teamAResult : null}
                    X
                    {match.teamBResult !== undefined ? match.teamBResult : null}
                    {match.teamBName}
                  </td>
                  {players.map((player, key2) => {
                    for (let i = 0; i < players.length; i++) {
                      let found = match.guesses.find(
                        (el) => el.player.name === player
                      );
                      return (
                        <td>
                          {found !== undefined
                            ? `${found.teamAguess} X ${found.teamBguess} +(${found.points})`
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
          <tr>
            <td className="justify-content-center d-flex">Points</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PointsTable;
