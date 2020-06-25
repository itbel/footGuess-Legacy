import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const JoinTournament = (tournamentid, userid, authState, dispatch) => {
  Axios.patch(
    "http://localhost:3001/api/tournaments/join",
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
      alert(`failed to join tournament`);
    });
};

export default JoinTournament;
