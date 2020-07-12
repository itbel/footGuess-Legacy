import Axios from "axios";

const AddResult = (tourid, matchid, teamAResult, teamBResult) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.patch(
    `${BASE_URL}/api/matches/manage`,
    {
      matchid: matchid,
      teamAResult: teamAResult,
      teamBResult: teamBResult,
      tourid: tourid,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AddResult;
