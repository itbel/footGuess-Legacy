import Axios from "axios";
import FetchMatches from "./FetchMatches";

const RemoveMatch = (matchid, authState, dispatch) => {
  Axios.delete(
    "http://localhost:3001/matches/removematch",
    {
      data: {
        matchid: matchid,
      },
    },
    { timeout: 2000 }
  )
    .then((response) => {
      FetchMatches(authState, dispatch).then((matches) => {
        return matches.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RemoveMatch;
