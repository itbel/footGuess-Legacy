import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import FetchPlayers from "../functional/FetchPlayers";

const PointsTable = () => {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    if (state.selectedTourId !== undefined) {
      FetchPlayers(state.selectedTourId, dispatch, state);
    }
  }, [state.players]);
  return (
    <>
      <table className="rankingTable" style={{ marginTop: "16px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {state.players !== undefined && state.players.length !== 0 ? (
            state.players.map((player, key) => {
              return (
                <tr key={key}>
                  <td className="results">{key + 1}</td>
                  <td className="results">{player.name}</td>
                  <td className="results">{player.points}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <b>No Results</b>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PointsTable;
