import Axios from "axios";

const AddResult = (matchid, teamAResult, teamBResult) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.patch(
    "http://localhost:3001/api/matches/manage",
    {
      matchid: matchid,
      teamAResult: teamAResult,
      teamBResult: teamBResult,
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
