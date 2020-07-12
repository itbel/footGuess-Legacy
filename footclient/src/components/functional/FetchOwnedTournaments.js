import Axios from "axios";

const FetchOwnedTournaments = (state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  if (state.isAuthenticated !== false)
    Axios.get(
      `${BASE_URL}/api/tournaments/owned`,
      {
        headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
      },
      {
        timeout: 2000,
      }
    )
      .then((response) => {
        dispatch({
          type: "FETCH_OWNED_TOURNAMENTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export default FetchOwnedTournaments;
