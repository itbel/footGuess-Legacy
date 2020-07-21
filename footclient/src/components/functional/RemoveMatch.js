import Axios from "axios";
import FetchMatches from "./FetchMatches";

const RemoveMatch = (matchid, state, dispatch, round) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };

  return Axios.delete(`${BASE_URL}/api/matches/manage/${matchid}`, config, {
    timeout: 2000,
  })
    .then((response) => {
      FetchMatches(state, dispatch, round);
      return response;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
      return error;
    });
};

export default RemoveMatch;
