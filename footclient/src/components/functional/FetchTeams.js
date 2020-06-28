import Axios from "axios";

const FetchTeams = (state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://localhost:3001/api/teams/all/${state.selectedTourId}`,
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      if (JSON.stringify(state.teams) !== JSON.stringify(response.data)) {
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
