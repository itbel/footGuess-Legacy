import Axios from "axios";

const FetchMatches = (state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://18.224.228.195:3005/api/matches/all/${state.selectedTourId}`,
    config,
    {
      timeout: 2000,
    }
  )
    .then((response) => {
      if (JSON.stringify(state.matches) !== JSON.stringify(response.data)) {
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
