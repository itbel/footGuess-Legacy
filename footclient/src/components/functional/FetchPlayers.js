import Axios from "axios";

const FetchPlayers = (tourid, dispatch, state) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  dispatch({ type: "UPDATING", payload: true });
  Axios.get(`${BASE_URL}/api/tournaments/players/${tourid}`, config, {
    timeout: 2000,
  })
    .then((response) => {
      if (JSON.stringify(state.players) !== JSON.stringify(response.data)) {
        dispatch({ type: "FETCH_PLAYERS", payload: response.data });
      }
      dispatch({ type: "UPDATING", payload: false });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchPlayers;
