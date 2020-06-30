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
      FetchRoundResult(state, 1).then((response) => {
        setMatches(response);
        let arr = [];
        for (let i = 0; i < response.length; i++) {
          arr.push(response[i].player);
        }
        let filtered = [...new Set(arr)];
        setPlayers(filtered);
      });
    }
  }, [state]);
  return (
    <Container>
      <Table striped hover variant="light">
        <thead>
          <tr>
            <th>Match</th>
            {players !== undefined
              ? players.map((player, key) => {
                  return <th>{player}</th>;
                })
              : null}
          </tr>
        </thead>
        <tbody>
          {matches !== undefined
            ? matches.map((match, key) => {
                console.log(match);
                return (
                  <tr key={key}>
                    <td className="justify-content-center d-flex">
                      {match.teamAResult !== undefined
                        ? match.teamAName + " " + match.teamAResult
                        : null}
                      X
                      {match.teamBResult !== undefined
                        ? match.teamBResult + " " + match.teamBName
                        : ""}
                    </td>
                    <td>
                      {match.teamAGuess !== undefined ? match.teamAGuess : null}
                      X{match.teamBGuess !== undefined ? match.teamBGuess : ""}
                    </td>
                  </tr>
                );
              })
            : null}
          <tr>
            <td className="justify-content-center d-flex">Points</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PointsTable;
