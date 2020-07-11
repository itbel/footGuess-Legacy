import Axios from "axios";
import FetchAll from "../functional/FetchAllTournaments";
import JoinTournament from "../functional/JoinTournament";

const CreateTournament = (tourname, state, dispatch) => {
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    "http://18.224.228.195:3005/api/tournaments/manage",
    {
      name: tourname,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      JoinTournament(response.data._id, state, dispatch);
      FetchAll(dispatch);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default CreateTournament;
