import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import Axios from "axios";
const TotalWins = () => {
  const [state, dispatch] = useContext(Context);
  const [players, setPlayers] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    Axios.get(`${BASE_URL}/api/tournaments/wins`, { timeout: 2000 })
      .then((response) => {
        if (response.data !== players) {
          setPlayers(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.allTournaments]);
  return (
    <table className="rankingTable">
      <thead>
        <tr>
          <th colSpan={2}>Overall Ranking</th>
        </tr>
        <tr>
          <th>Player</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        {players !== undefined
          ? players.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.player}</td>
                  <td>{val.wins}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};

export default TotalWins;
