import React from "react";
import Axios from "axios";

const AddTeam = (tourid, team) => {
  console.log(tourid);
  console.log(team);
  Axios.post(
    "http://localhost:3001/teams/addteam",
    {
      teamName: team,
      tournamentid: tourid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddTeam;
