const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", action.payload.name);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.name,
        userid: action.payload._id,
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
    case "FETCH_MATCHES":
      return {
        ...state,
        matches: action.payload,
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
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
export default Reducer;
