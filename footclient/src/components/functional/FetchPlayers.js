import Axios from "axios";

const FetchPlayers = (authState) => {
  return Axios.get(
    `http://localhost:3001/api/tournaments/players/${authState.selectedTourId}`,
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

export default FetchPlayers;
