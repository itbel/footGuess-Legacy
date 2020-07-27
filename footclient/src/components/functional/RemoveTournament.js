import Axios from "axios";
import FetchAll from "../functional/FetchAllTournaments";
import FetchOwned from "../functional/FetchOwnedTournaments";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const RemoveTournament = (tourid, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };

  return Axios.delete(`${BASE_URL}/api/tournaments/manage/${tourid}`, config, {
    timeout: 2000,
  })
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

export default RemoveTournament;
