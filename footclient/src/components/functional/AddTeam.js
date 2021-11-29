import Axios from "axios";

const AddTeam = (state, tourid, team, dispatch) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.post(
            `${BASE_URL}/api/teams/manage`, {
                teamName: team,
                tournamentid: tourid,
            },
            config, { timeout: 7000 }
        )
        .then((response) => {
            dispatch({
                type: "FETCH_TEAMS",
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

export default AddTeam;