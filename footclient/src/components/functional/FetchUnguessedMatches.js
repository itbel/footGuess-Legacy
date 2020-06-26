import Axios from "axios";

const FetchUnguessedMatches = (authState) => {
  return Axios.get(
    `http://localhost:3001/api/matches/unguessed/${authState.selectedTourId}&${authState.userid}`,
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
