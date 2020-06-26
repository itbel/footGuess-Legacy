import Axios from "axios";

const FetchOwnedTournaments = (authState, dispatch) => {
  if (authState.userid !== undefined)
    Axios.get(
      `http://localhost:3001/api/tournaments/owned/${authState.userid}`,
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
