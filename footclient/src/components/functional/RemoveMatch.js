import Axios from "axios";

const RemoveMatch = (matchid, dispatch) => {
  Axios.post(
    "http://localhost:3001/matches/removematch",
    {
      matchid: matchid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default RemoveMatch;
