import Axios from "axios";
import FetchMatches from "./FetchMatches";

const RemoveMatch = (matchid, state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  Axios.delete(`http://localhost:3005/api/matches/manage/${matchid}`, config, {
    timeout: 2000,
  })
    .then((response) => {
      console.log(response);
      FetchMatches(state, dispatch).then((matches) => {
        return matches.data;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RemoveMatch;
