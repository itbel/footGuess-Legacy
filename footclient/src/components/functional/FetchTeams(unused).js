import Axios from "axios";

const FetchTeams = (authState, dispatch) => {
  console.log("Fetching teams from FetchTeams.js. TourID is:");
  console.log(authState.selectedTourId);
  Axios.post(
    "http://localhost:3001/teams/getteams",
    {
      tourid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      console.log("dispatching response from FetchTeams.js");
      console.log(response.data);
      dispatch({
        type: "FETCH_TEAMS",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchTeams;
