import Axios from "axios";
import FetchTeams from "./FetchTeams";

const RemoveTeam = (teamid, state, dispatch) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };

    return Axios.delete(
            `${BASE_URL}/api/teams/manage/${state.selectedTourId}&${teamid}`,
            config, {
                timeout: 7000,
            }
        )
        .then((response) => {
            FetchTeams(state, dispatch);
            return response;
        })
        .catch((error) => {
            if (error.response !== undefined && error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default RemoveTeam;