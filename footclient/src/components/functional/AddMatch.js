import Axios from "axios";

const AddMatch = (state, teamA, teamB, round, tourid, dispatch) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.post(
            `${BASE_URL}/api/matches/manage`, {
                tournamentid: tourid,
                round: round,
                teamA: teamA,
                teamB: teamB,
            },
            config, { timeout: 7000 }
        )
        .then((response) => {
            dispatch({
                type: "FETCH_MATCHES",
                payload: response.data,
            });
            return response;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default AddMatch;