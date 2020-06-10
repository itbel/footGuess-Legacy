import Axios from "axios";
import FetchAll from "../functional/FetchAllTournaments";
import JoinTournament from "../functional/JoinTournament";

const CreateTournament = (tourname, userid, authState, dispatch) => {
  return Axios.post(
    "http://localhost:3001/tournaments/createtournament",
    {
      name: tourname,
      owner: userid,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      FetchAll(dispatch);
      JoinTournament(response.data._id, userid, authState, dispatch);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default CreateTournament;
