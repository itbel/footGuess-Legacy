import Axios from "axios";

const FetchTeams = (state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  Axios.get(`${BASE_URL}/api/teams/all/${state.selectedTourId}`, config, {
    timeout: 2000,
  })
    .then((response) => {
      if (JSON.stringify(state.teams) !== JSON.stringify(response.data)) {
        dispatch({
          type: "FETCH_TEAMS",
          payload: response.data,
        });
      }
      dispatch({ type: "UPDATING", payload: false });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchTeams;
