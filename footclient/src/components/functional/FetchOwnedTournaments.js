import Axios from "axios";

const FetchOwnedTournaments = (state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  if (state.isAuthenticated !== false) {
    dispatch({ type: "UPDATING", payload: true });
    Axios.get(
      `${BASE_URL}/api/tournaments/owned`,
      {
        headers: { "auth-token": `${state.jwtToken}` },
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
        dispatch({ type: "UPDATING", payload: false });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch({ type: "LOGOUT" });
        }
        dispatch({ type: "UPDATING", payload: false });
      });
  }
};

export default FetchOwnedTournaments;
