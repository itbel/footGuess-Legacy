import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store";
import Axios from "axios";
const TotalWins = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {}, [state.allTournaments]);
  return (
    <table className="rankingTable">
      <thead>
        <tr>
          <th>Player</th>
          <th>Wins</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default TotalWins;
