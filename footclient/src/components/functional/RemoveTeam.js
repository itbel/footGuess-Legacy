import Axios from "axios";
import FetchTeams from "../functional/FetchTeams";

const RemoveTeam = (tournamentid, teamName, authState, dispatch) => {
  Axios.post(
    "http://localhost:3001/teams/deleteteam",
    {
      teamName: teamName,
      tournamentid: tournamentid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      alert(`team removed successfully`);
      FetchTeams(authState, dispatch);
    })
    .catch((error) => {
      alert(`failed to remove team`);
    });
};

export default RemoveTeam;
