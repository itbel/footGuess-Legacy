import { Table } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import FetchPlayers from "../functional/FetchPlayers";

const PointsTable = () => {
  const { state: authState } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (authState.selectedTourId !== undefined) {
      FetchPlayers(authState).then((response) => {
        setPlayers(response);
      });
    }
  }, []);
  return (
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
  );
};

export default PointsTable;
