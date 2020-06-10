import Axios from "axios";

const AddResult = (matchid, teamAResult, teamBResult) => {
  console.log(matchid);
  return Axios.post(
    "http://localhost:3001/matches/addresult",
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
