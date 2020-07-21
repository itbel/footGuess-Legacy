import Axios from "axios";

const FetchAllTournaments = (dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  dispatch({ type: "UPDATING", payload: true });
  Axios.get(`${BASE_URL}/api/tournaments/all`, { timeout: 2000 })
    .then((response) => {
      dispatch({
        type: "FETCH_ALL_TOURNAMENTS",
        payload: response.data,
      });
      dispatch({ type: "UPDATING", payload: false });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: "UPDATING", payload: false });
    });
};

export default FetchAllTournaments;
