import Axios from "axios";

const FetchMatches = (authState, dispatch) => {
  return Axios.post(
    "http://localhost:3001/matches/allmatches",
    {
      tournamentid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      if (JSON.stringify(authState.matches) !== JSON.stringify(response.data)) {
        dispatch({
          type: "FETCH_MATCHES",
          payload: response.data,
        });
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchMatches;
