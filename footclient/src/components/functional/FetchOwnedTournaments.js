import Axios from "axios";

const FetchOwnedTournaments = (authState, dispatch) => {
  console.log("FetchOwnedTournaments called.");
  Axios.post(
    "http://localhost:3001/tournaments/getownedtournaments",
    { userid: authState.userid },
    { timeout: 2000 }
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
