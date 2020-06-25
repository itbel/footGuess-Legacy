import Axios from "axios";

const FetchHighestRound = (authState) => {
  return Axios.get(
    `http://localhost:3001/api/matches/maxround/${authState.selectedTourId}`,
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
