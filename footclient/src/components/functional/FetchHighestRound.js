import Axios from "axios";

const FetchHighestRound = (state, tournamentid, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  return Axios.get(`${BASE_URL}/api/matches/maxround/${tournamentid}`, config, {
    timeout: 2000,
  })
    .then((response) => {
      dispatch({ type: "UPDATING", payload: false });
      return response.data;
    })
    .catch((error) => {
      dispatch({ type: "UPDATING", payload: false });
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
    });
};

export default FetchHighestRound;
