import Axios from "axios";

const FetchLatestRound = (state, dispatch) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    dispatch({ type: "UPDATING", payload: true });
    if (state.selectedTourId !== undefined)
        Axios.get(
            `${BASE_URL}/api/tournaments/latestround/${state.selectedTourId}`,
            config, { timeout: 7000 }
        )
        .then((response) => {
            if (
                JSON.stringify(state.latestRound) !==
                JSON.stringify(response.data.currentRound)
            ) {
                dispatch({
                    type: "FETCH_LATESTROUND",
                    payload: response.data.currentRound,
                });
            }
            dispatch({ type: "UPDATING", payload: false });
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            dispatch({ type: "UPDATING", payload: false });
        });
};

export default FetchLatestRound;