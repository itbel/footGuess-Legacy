import Axios from "axios";

const FetchAllTournaments = (dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  Axios.get(`${BASE_URL}/api/tournaments/all`, { timeout: 2000 })
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
