import Axios from "axios";

const FetchUnguessedMatches = (state, round) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `${BASE_URL}/api/matches/unguessed/${state.selectedTourId}&${round}`,
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchUnguessedMatches;
