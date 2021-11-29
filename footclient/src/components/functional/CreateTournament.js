import Axios from "axios";
import FetchAll from "../functional/FetchAllTournaments";
import JoinTournament from "../functional/JoinTournament";
import FetchOwned from "../functional/FetchOwnedTournaments";

const CreateTournament = async (tourname, state, dispatch) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const config = {
    headers: { "auth-token": `${state.jwtToken}` },
  };
  try {
    const response = await Axios.post(
      `${BASE_URL}/api/tournaments/manage`,
      {
        name: tourname,
      },
      config,
      { timeout: 7000 }
    );
    console.log("trying to create tour", {response})
    await JoinTournament(response?.data?.id, state, dispatch);
    await FetchAll(state, dispatch);
    await FetchOwned(state, dispatch);
    return response;
  } catch (error) {
      console.log("errored")
    return {error};
  }
};

export default CreateTournament;
