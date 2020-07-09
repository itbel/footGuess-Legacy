import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Store";
import FetchPlayers from "../functional/FetchPlayers";

const PointsTable = () => {
  const [state] = useContext(Context);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchPlayers(state.selectedTourId).then((response) => {
        if (response.length > 0) {
          setPlayers(response);
        }
      });
    }
  }, [state]);
  return (
    <>
      <table className="rankingTable" style={{ marginTop: "16px" }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, key) => {
            return (
              <tr>
                <td className="results">{player.name}</td>
                <td className="results text-center">{player.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PointsTable;
