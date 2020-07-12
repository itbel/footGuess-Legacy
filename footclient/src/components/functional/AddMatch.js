import Axios from "axios";

const AddMatch = (teamA, teamB, round, tourid, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.post(
    "http://localhost:3005/api/matches/manage",
    {
      tournamentid: tourid,
      round: round,
      teamA: teamA,
      teamB: teamB,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      dispatch({
        type: "FETCH_MATCHES",
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddMatch;
