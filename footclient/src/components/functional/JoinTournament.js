import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const JoinTournament = (tournamentid, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.patch(
    `${BASE_URL}/api/tournaments/join`,
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
      alert(`failed to join tournament`);
    });
};

export default JoinTournament;
