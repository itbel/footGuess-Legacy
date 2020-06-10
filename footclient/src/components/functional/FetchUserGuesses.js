import Axios from "axios";

const FetchUserGuesses = (authState) => {
  return Axios.post(
    "http://localhost:3001/guess/guesses/",
    {
      userid: authState.userid,
      tournamentid: authState.selectedTourId,
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
