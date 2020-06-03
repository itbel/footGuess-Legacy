import Axios from "axios";

const FetchTeams = (authState, dispatch) => {
  console.log("FetchTeams called.");
  Axios.post(
    "http://localhost:3001/teams/getteams",
    {
      tourid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      console.log("received");
      dispatch({
        type: "FETCH_TEAMS",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log("errored");
      console.log(error);
    });
};

export default FetchTeams;
