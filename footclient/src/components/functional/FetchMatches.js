import Axios from "axios";

const FetchMatches = (authState, dispatch) => {
  return Axios.get(
    `http://localhost:3001/api/matches/all/${authState.selectedTourId}`,
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
