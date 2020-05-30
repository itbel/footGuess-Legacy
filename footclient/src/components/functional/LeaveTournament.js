import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const LeaveTournament = (tournamentid, userid, authState, dispatch) => {
  Axios.post(
    "http://localhost:3001/tournaments/leave",
    {
      tournamentid: tournamentid,
      userid: userid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      alert(`left tournament successfully`);
      FetchJoinedTournaments(authState, dispatch);
    })
    .catch((error) => {
      alert(`failed to leave tournament`);
    });
};

export default LeaveTournament;
