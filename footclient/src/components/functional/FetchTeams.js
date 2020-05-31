import Axios from "axios";

const FetchTeams = (authState, dispatch) => {
  console.log(authState.selectedTourId);
  Axios.post(
    "http://localhost:3001/teams/getteams",
    {
      tourid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
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
