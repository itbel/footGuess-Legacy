import Axios from "axios";

const FetchRoundResult = (round, tourid) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://18.224.228.195:3005/api/matches/points/${round}&${tourid}`,
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
