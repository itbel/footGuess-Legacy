import Axios from "axios";

const FetchJoinedTournaments = (state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  if (state.isAuthenticated !== false) {
    dispatch({ type: "UPDATING", payload: true });
    Axios.get(`${BASE_URL}/api/tournaments/joined`, config, {
      timeout: 2000,
    })
      .then((response) => {
        if (
          JSON.stringify(state.joinedTournaments) !==
          JSON.stringify(response.data)
        ) {
          dispatch({
            type: "FETCH_JOINED_TOURNAMENTS",
            payload: response.data,
          });
        }
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

export default FetchJoinedTournaments;
