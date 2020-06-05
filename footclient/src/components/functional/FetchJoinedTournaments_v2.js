import Axios from "axios";

const FetchJoinedTournaments_v2 = (userid) => {
  console.log("FetchJoinedTournamentsv2 called.");
  return Axios.post(
    "http://localhost:3001/tournaments/getjoinedtournaments",
    {
      userid: userid,
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

export default FetchJoinedTournaments_v2;
