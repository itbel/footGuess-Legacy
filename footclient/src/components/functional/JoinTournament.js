import Axios from "axios";

const JoinTournament = (tournamentid, userid) => {
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
    })
    .catch((error) => {
      alert(`failed to join tournament`);
    });
};

export default JoinTournament;
