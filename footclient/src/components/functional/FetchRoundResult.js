import Axios from "axios";

const FetchRoundResult = () => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.get(`http://localhost:3001/api/matches/points`, config, {
    timeout: 2000,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default FetchRoundResult;
