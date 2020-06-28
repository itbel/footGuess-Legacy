import Axios from "axios";

const FetchHighestRound = (authState) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://localhost:3001/api/matches/maxround/${authState.selectedTourId}`,
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

export default FetchHighestRound;
