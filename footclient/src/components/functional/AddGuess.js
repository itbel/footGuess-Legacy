import Axios from "axios";
import FetchUserGuesses from "../functional/FetchUserGuesses";

const AddGuess = (
  dispatch,
  state,
  round,
  teamAguess,
  teamBguess,
  matchid,
  tourid
) => {
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
  )
    .then((response) => {
      FetchUserGuesses(dispatch, state, round);
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export default AddGuess;
