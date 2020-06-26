import Axios from "axios";

const FetchUnguessedMatches = (state, round) => {
  return Axios.get(
    `http://localhost:3001/api/matches/unguessed/${state.selectedTourId}&${state.userid}&${round}`,
    { timeout: 2000 }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchUnguessedMatches;
