import Axios from "axios";

const AddMatch = (teamA, teamB, round, authState, dispatch) => {
  console.log(`received ${teamA} vs ${teamB} on round ${round}`);
  Axios.post(
    "http://localhost:3001/matches/addmatch",
    {
      tournamentid: authState.selectedTourId,
      round: round,
      teamA: teamA,
      teamB: teamB,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      dispatch({
        type: "FETCH_MATCHES",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddMatch;
