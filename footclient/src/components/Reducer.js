const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("jwtToken", action.payload);
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
      };
    case "FETCH_ALL_TOURNAMENTS":
      if (state.allTournaments !== action.payload) {
        return {
          ...state,
          allTournaments: action.payload,
        };
      } else {
        return { ...state };
      }
    case "SELECT_TOURNAMENT":
      if (state.selectedTourId !== action.payload.tournamentid) {
        return {
          ...state,
          selectedTourName: action.payload.name,
          selectedTourId: action.payload.tournamentid,
        };
      } else {
        return { ...state };
      }
    case "UPDATING":
      return {
        ...state,
        isUpdating: action.payload,
      };
    case "FETCH_MATCHES":
      return {
        ...state,
        matches: action.payload,
      };
    case "FETCH_PLAYERS":
      return {
        ...state,
        players: action.payload,
      };
    case "FETCH_TEAMS":
      return {
        ...state,
        teams: action.payload,
      };
    case "FETCH_JOINED_TOURNAMENTS":
      return {
        ...state,
        joinedTournaments: action.payload,
      };
    case "FETCH_OWNED_TOURNAMENTS":
      return {
        ...state,
        ownedTournaments: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
