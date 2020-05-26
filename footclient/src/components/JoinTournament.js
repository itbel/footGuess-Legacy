import React from "react";
import TournamentList from "./TournamentsTable";
const JoinTournament = () => {
  return (
    <div
      style={{
        backgroundColor: "#25282A",
        borderRadius: "16px 16px 16px 16px",
        height: "80vh",
        padding: "16px",
        color: "#efefef",
      }}
    >
      <h1>Join Tournament</h1>
      <TournamentList></TournamentList>
    </div>
  );
};

export default JoinTournament;
