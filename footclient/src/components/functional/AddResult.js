import Axios from "axios";
import FetchRound from "../functional/FetchRound";

const AddResult = (
    state,
    dispatch,
    selectedRound,
    tourid,
    matchid,
    teamAResult,
    teamBResult
) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.patch(
            `${BASE_URL}/api/matches/manage`, {
                matchid: matchid,
                teamAResult: teamAResult,
                teamBResult: teamBResult,
                tourid: tourid,
            },
            config, { timeout: 7000 }
        )
        .then((response) => {
            FetchRound(state, selectedRound, dispatch);
            return response;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default AddResult;