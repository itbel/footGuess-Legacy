import Axios from "axios";

const AddResult = (tourid, matchid, teamAResult, teamBResult) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.patch(
    "http://18.224.228.195:3005/api/matches/manage",
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
