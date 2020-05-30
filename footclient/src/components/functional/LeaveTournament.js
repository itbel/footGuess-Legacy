import Axios from "axios";

const LeaveTournament = (tournamentid, userid) => {
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
    })
    .catch((error) => {
      alert(`failed to leave tournament`);
    });
};

export default LeaveTournament;
