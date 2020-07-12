import Axios from "axios";

const FetchAllTournaments = (dispatch) => {
  Axios.get("http://localhost:3005/api/tournaments/all", { timeout: 2000 })
    .then((response) => {
      dispatch({
        type: "FETCH_ALL_TOURNAMENTS",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchAllTournaments;
