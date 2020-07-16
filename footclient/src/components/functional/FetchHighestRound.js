import Axios from "axios";

const FetchHighestRound = (tournamentid, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
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
      console.log(error);
    });
};

export default FetchHighestRound;
