import Axios from "axios";
import FetchAll from "./FetchAllTournaments";
import FetchOwned from "./FetchOwnedTournaments";
import FetchJoinedTournaments from "./FetchJoinedTournaments";

const EndTournament = (tournamentid, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };

  return Axios.patch(
    `${BASE_URL}/api/tournaments/end`,
    {
      id: tournamentid,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      FetchJoinedTournaments(state, dispatch);
      FetchAll(state, dispatch);
      FetchOwned(state, dispatch);
      return response;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
      return error;
    });
};
export default EndTournament;
