import Axios from "axios";

const FetchRound = (authState, selectedRound) => {
  return Axios.get(
    `http://localhost:3001/api/matches/round/${authState.selectedTourId}&${selectedRound}`,
    { timeout: 2000 }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchRound;
