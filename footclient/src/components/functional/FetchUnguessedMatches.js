import Axios from "axios";

const FetchUnguessedMatches = (authState) => {
  return Axios.post(
    "http://localhost:3001/matches/getunguessedmatches",
    {
      tournamentid: authState.selectedTourId,
      userid: authState.userid,
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

export default FetchUnguessedMatches;
