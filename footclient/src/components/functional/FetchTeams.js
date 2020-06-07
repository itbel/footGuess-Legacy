import Axios from "axios";

const FetchTeams = (authState, dispatch) => {
  return Axios.post(
    "http://localhost:3001/teams/getteams",
    {
      tourid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      if (JSON.stringify(authState.teams) !== JSON.stringify(response.data)) {
        dispatch({
          type: "FETCH_TEAMS",
          payload: response.data,
        });
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchTeams;
