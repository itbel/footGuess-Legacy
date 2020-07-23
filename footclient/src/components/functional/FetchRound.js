import Axios from "axios";

const FetchRound = (state, selectedRound, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  return Axios.get(
    `${BASE_URL}/api/matches/round/${state.selectedTourId}&${selectedRound}`,
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      if (JSON.stringify(state.results) !== JSON.stringify(response.data)) {
        dispatch({ type: "FETCH_RESULTS", payload: response.data });
      }
      dispatch({ type: "UPDATING", payload: false });
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "UPDATING", payload: false });
    });
};

export default FetchRound;
