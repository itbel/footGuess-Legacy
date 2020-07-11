import Axios from "axios";
const AddGuess = (teamAguess, teamBguess, matchid, tourid) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    "http://18.224.228.195:3005/api/guesses/manage",
    {
      matchid: matchid,
      tourid: tourid,
      teamAguess: teamAguess,
      teamBguess: teamBguess,
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

export default AddGuess;
