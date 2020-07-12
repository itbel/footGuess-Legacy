import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const LeaveTournament = (tournamentid, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.patch(
    `${BASE_URL}/api/tournaments/leave`,
    {
      tournamentid: tournamentid,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      FetchJoinedTournaments(state, dispatch);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default LeaveTournament;
