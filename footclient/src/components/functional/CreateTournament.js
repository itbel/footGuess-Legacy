import Axios from "axios";
import FetchAll from "../functional/FetchAllTournaments";
import JoinTournament from "../functional/JoinTournament";
import FetchOwned from "../functional/FetchOwnedTournaments";

const CreateTournament = (tourname, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${localStorage.getItem("jwtToken")}` },
  };
  return Axios.post(
    `${BASE_URL}/api/tournaments/manage`,
    {
      name: tourname,
    },
    config,
    { timeout: 2000 }
  )
    .then((response) => {
      JoinTournament(response.data._id, state, dispatch);
      FetchAll(dispatch);
      FetchOwned(state, dispatch);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default CreateTournament;
