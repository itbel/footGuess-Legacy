import Axios from "axios";
const AddGuess = (teamAguess, teamBguess, matchid) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    "http://localhost:3001/api/guesses/manage",
    {
      matchid: matchid,
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
