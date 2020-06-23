import Axios from "axios";

const FetchPlayers = (authState) => {
  return Axios.post(
    "http://localhost:3001/tournaments/players",
    {
      tournamentid: authState.selectedTourId,
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

export default FetchPlayer;
s;
