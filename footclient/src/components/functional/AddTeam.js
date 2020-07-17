import Axios from "axios";

const AddTeam = (tourid, team, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    `${BASE_URL}/api/teams/manage`,
    {
      teamName: team,
      tournamentid: tourid,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      dispatch({
        type: "FETCH_TEAMS",
        payload: response.data,
      });
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default AddTeam;
