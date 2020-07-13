import Axios from "axios";

const FetchMatches = (state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  Axios.get(`${BASE_URL}/api/matches/all/${state.selectedTourId}`, config, {
    timeout: 2000,
  })
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
      console.log(error);
    });
};

export default FetchMatches;
