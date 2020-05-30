import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const JoinTournament = (tournamentid, userid, authState, dispatch) => {
  Axios.post(
    "http://localhost:3001/tournaments/join",
    {
      tournamentid: tournamentid,
      userid: userid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      alert(`joined ${response.data.name} tournament successfully`);
      FetchJoinedTournaments(authState, dispatch);
    })
    .catch((error) => {
      alert(`failed to join tournament`);
    });
};

export default JoinTournament;
