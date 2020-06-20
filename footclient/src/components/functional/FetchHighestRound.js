import Axios from "axios";

const FetchHighestRound = (authState) => {
  console.log("FetchHighestRound called.");
  return Axios.post(
    "http://localhost:3001/matches/getmaxround",
    { tourid: authState.selectedTourId },
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
