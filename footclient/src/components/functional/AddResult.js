import Axios from "axios";

const AddResult = (matchid, teamAResult, teamBResult) => {
  return Axios.patch(
    "http://localhost:3001/api/matches/update",
    {
      matchid: matchid,
      teamAResult: teamAResult,
      teamBResult: teamBResult,
    },
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
