import Axios from "axios";

const AddTeam = (tourid, team, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.post(
    "http://localhost:3001/api/teams/manage",
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
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddTeam;
