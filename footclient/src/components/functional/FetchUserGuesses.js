import Axios from "axios";

const FetchUserGuesses = (authState, round) => {
  return Axios.get(
    `http://localhost:3001/api/guesses/all/${authState.userid}&${authState.selectedTourId}&${round}`,
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
