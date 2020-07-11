import Axios from "axios";

const FetchJoinedTournaments = (state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  if (state.isAuthenticated !== false)
    Axios.get(`http://18.224.228.195:3005/api/tournaments/joined`, config, {
      timeout: 2000,
    })
      .then((response) => {
        dispatch({
          type: "FETCH_JOINED_TOURNAMENTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
};

export default FetchJoinedTournaments;
