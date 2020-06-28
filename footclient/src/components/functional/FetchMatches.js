import Axios from "axios";

const FetchMatches = (authState, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://localhost:3001/api/matches/all/${authState.selectedTourId}`,
    config,
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
