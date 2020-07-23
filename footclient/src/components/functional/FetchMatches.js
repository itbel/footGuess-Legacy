import Axios from "axios";

const FetchMatches = (state, dispatch, round) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  Axios.get(
    `${BASE_URL}/api/matches/all/${state.selectedTourId}&${round}`,
    config,
    {
      timeout: 2000,
    }
  )
    .then((response) => {
      if (JSON.stringify(state.matches) !== JSON.stringify(response.data)) {
        dispatch({
          type: "FETCH_MATCHES",
          payload: response.data,
        });
      }
      dispatch({ type: "UPDATING", payload: false });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "UPDATING", payload: false });
    });
};

export default FetchMatches;
