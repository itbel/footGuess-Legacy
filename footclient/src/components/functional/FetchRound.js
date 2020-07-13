import Axios from "axios";

const FetchRound = (state, selectedRound, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  return Axios.get(
    `${BASE_URL}/api/matches/round/${state.selectedTourId}&${selectedRound}`,
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      dispatch({ type: "UPDATING", payload: false });
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchRound;
