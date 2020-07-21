import Axios from "axios";

const FetchRoundResult = (state, round, tourid) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  return Axios.get(
    `${BASE_URL}/api/matches/points/${round}&${tourid}`,
    config,
    {
      timeout: 2000,
    }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchRoundResult;
