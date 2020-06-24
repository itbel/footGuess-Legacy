import Axios from "axios";

const FetchAllTournaments = (dispatch) => {
  Axios.get(
    "http://localhost:3001/tournaments/getalltournaments",
    {},
    { timeout: 2000 }
  )
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
