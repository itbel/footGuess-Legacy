import Axios from "axios";
const AddGuess = (teamAguess, teamBguess, matchid, tourid) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    `${BASE_URL}/api/guesses/manage`,
    {
      matchid: matchid,
      tourid: tourid,
      teamAguess: teamAguess,
      teamBguess: teamBguess,
    },
    config,
    { timeout: 2000 }
  );
};

export default AddGuess;
