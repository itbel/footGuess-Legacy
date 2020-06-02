import Axios from "axios";

const FetchJoinedTournaments = (authState, dispatch) => {
  Axios.post(
    "http://localhost:3001/tournaments/getjoinedtournaments",
    {
      userid: authState.userid,
    },
    { timeout: 2000 }
  )
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