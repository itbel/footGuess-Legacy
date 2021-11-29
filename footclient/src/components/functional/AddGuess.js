import Axios from "axios";
import FetchUserGuesses from "../functional/FetchUserGuesses";

const AddGuess = (
    dispatch,
    state,
    round,
    teamAguess,
    teamBguess,
    matchid,
    tourid
) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const config = {
        headers: { "auth-token": `${state.jwtToken}` },
    };
    return Axios.post(
            `${BASE_URL}/api/guesses/manage`, {
                matchid: matchid,
                tourid: tourid,
                teamAguess: teamAguess,
                teamBguess: teamBguess,
            },
            config, { timeout: 7000 }
        )
        .then((response) => {
            FetchUserGuesses(dispatch, state, round);
            return response;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                dispatch({ type: "LOGOUT" });
            }
            return error;
        });
};

export default AddGuess;