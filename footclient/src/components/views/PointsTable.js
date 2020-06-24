import { Table, Container } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchPlayers from "../functional/FetchPlayers";

const PointsTable = () => {
  const [state] = useContext(Context);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchPlayers(state).then((response) => {
        setPlayers(response);
      });
    }
  }, [state]);
  return (
    <Container>
      <Table striped hover variant="light">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players !== undefined
            ? players.map((player, key) => {
                return (
                  <tr key={key}>
                    <td>{player.name}</td>
                    <td>{player.points}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </Container>
  );
};

export default PointsTable;
