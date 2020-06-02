import Axios from "axios";

const RemoveTeam = (val, authState, dispatch) => {
  Axios.post(
    "http://localhost:3001/teams/deleteteam",
    {
      teamName: val.teamName,
      tournamentid: authState.selectedTourId,
    },
    { timeout: 2000 }
  )
    .then((response) => {
      alert(`team removed successfully`);
      dispatch({
        type: "FETCH_TEAMS",
        payload: response.data,
      });
    })
    .catch((error) => {
      alert(`failed to remove team`);
    });
};

export default RemoveTeam;
