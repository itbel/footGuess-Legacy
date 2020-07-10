import Axios from "axios";

const FetchPlayers = (tourid) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(
    `http://localhost:3001/api/tournaments/players/${tourid}`,
    config,
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
