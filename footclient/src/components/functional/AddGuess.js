import Axios from "axios";
const AddGuess = (teamAguess, teamBguess, matchid, authState) => {
  return Axios.put(
    "http://localhost:3001/guess/addguess",
    {
      matchid: matchid,
      teamAguess: teamAguess,
      teamBguess: teamBguess,
      userid: authState.userid,
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

export default AddGuess;
