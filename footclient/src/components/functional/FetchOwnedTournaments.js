import Axios from "axios";

const FetchOwnedTournaments = (state, dispatch) => {
  if (state.isAuthenticated !== false)
    Axios.get(
      `http://localhost:3001/api/tournaments/owned`,
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
