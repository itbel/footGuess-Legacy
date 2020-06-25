import Axios from "axios";

const FetchUserGuesses = (authState, round) => {
  return Axios.post(
    "http://localhost:3001/api/guess/all",
    {
      userid: authState.userid,
      tournamentid: authState.selectedTourId,
      round: round,
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

export default FetchUserGuesses;
