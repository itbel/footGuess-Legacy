import Axios from "axios";
import FetchTeams from "./FetchTeams";

const RemoveTeam = (teamid, state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.delete(
    `http://18.224.228.195:3005/api/teams/manage/${teamid}`,
    config,
    {
      timeout: 2000,
    }
  )
    .then((response) => {
      FetchTeams(state, dispatch).then((teams) => {
        return teams.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RemoveTeam;
