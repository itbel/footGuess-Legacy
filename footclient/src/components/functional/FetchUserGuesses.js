import Axios from "axios";

const FetchUserGuesses = (dispatch, state, round) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };

  return Axios.get(
    `${BASE_URL}/api/guesses/all/${state.selectedTourId}&${round}`,
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      if (JSON.stringify(state.guesses) !== JSON.stringify(response.data)) {
        dispatch({ type: "FETCH_GUESSES", payload: response.data });
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchUserGuesses;
