import Axios from "axios";

const FetchJoinedTournaments = (state, dispatch) => {
  if (state.userid !== undefined)
    Axios.get(`http://localhost:3001/api/tournaments/joined/${state.userid}`, {
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
