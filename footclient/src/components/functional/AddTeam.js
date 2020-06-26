import Axios from "axios";

const AddTeam = (tourid, team, dispatch) => {
  Axios.post(
    "http://localhost:3001/api/teams/add",
    {
      teamName: team,
      tournamentid: tourid,
    },
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
