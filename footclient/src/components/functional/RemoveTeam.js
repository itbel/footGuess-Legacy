import Axios from "axios";
import FetchTeams from "./FetchTeams";

const RemoveTeam = (teamid, authState, dispatch) => {
  Axios.delete(
    "http://localhost:3001/teams/deleteteam",
    {
      data: {
        teamid: teamid,
      },
    },
    { timeout: 2000 }
  )
    .then((response) => {
      FetchTeams(authState, dispatch).then((teams) => {
        return teams.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RemoveTeam;
