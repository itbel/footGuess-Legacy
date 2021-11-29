import Axios from "axios";

const FetchUnguessedMatches = (state, dispatch, tourid, round) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.get(
            `${BASE_URL}/api/matches/unguessed/${tourid}&${round}`,
            config, { timeout: 7000 }
        )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default FetchUnguessedMatches;