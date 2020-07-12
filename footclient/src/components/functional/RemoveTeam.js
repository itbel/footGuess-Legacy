import Axios from "axios";
import FetchTeams from "./FetchTeams";

const RemoveTeam = (teamid, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.delete(`${BASE_URL}/api/teams/manage/${teamid}`, config, {
    timeout: 2000,
  })
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
