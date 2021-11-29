import Axios from "axios";

const FetchRoundResult = (dispatch, state, round, tourid) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.get(
            `${BASE_URL}/api/matches/points/${round}&${tourid}`,
            config, {
                timeout: 7000,
            }
        )
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default FetchRoundResult;