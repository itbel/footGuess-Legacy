const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        jwtToken: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        jwtToken: "",
        user: undefined,
        userid: undefined,
        selectedTourName: undefined,
        selectedTourId: undefined,
        joinedTournaments: [],
        allTournaments: [],
        ownedTournaments: [],
        teams: [],
        matches: [],
        results: [],
        guesses: [],
        isUpdating: false,
        players: [],
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
    case "FETCH_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    case "FETCH_GUESSES":
      return {
        ...state,
        guesses: action.payload,
      };
    case "SELECT_TOURNAMENT":
      if (state.selectedTourId !== action.payload.tournamentid) {
        return {
          ...state,
          selectedTourName: action.payload.name,
          selectedTourId: action.payload.tournamentid,
          teams: [],
          matches: [],
          players: [],
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
