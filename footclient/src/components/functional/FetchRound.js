import Axios from "axios";

const FetchRound = (authState, selectedRound) => {
  return Axios.post(
    "http://localhost:3001/api/matches/round",
    {
      tournamentid: authState.selectedTourId,
      round: selectedRound,
    },
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
