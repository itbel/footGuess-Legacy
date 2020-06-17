import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const LeaveTournament = (tournamentid, userid, authState, dispatch) => {
  Axios.patch(
    "http://localhost:3001/tournaments/leave",
    {
      tournamentid: tournamentid,
      userid: userid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      FetchJoinedTournaments(authState, dispatch);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default LeaveTournament;
