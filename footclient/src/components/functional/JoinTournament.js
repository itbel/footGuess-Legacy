import Axios from "axios";
import FetchJoinedTournaments from "../functional/FetchJoinedTournaments";

const JoinTournament = (tournamentid, state, dispatch) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };

    return Axios.patch(
            `${BASE_URL}/api/tournaments/join`, {
                tournamentid: tournamentid,
            },
            config, { timeout: 7000 }
        )
        .then((response) => {
            FetchJoinedTournaments(state, dispatch);
            return response;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default JoinTournament;