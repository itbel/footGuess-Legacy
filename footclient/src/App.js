import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Landing from "./components/Landing";
import "./App.css";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  userid: null,
  joinedTournaments: [],
  allTournaments: [],
  ownedTournaments: [],
  selectedTour: undefined,
};

const reducer = (state, action) => {
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
      return {
        ...state,
        allTournaments: action.payload,
      };
    case "SELECT_TOURNAMENT":
      return {
        ...state,
        selectedTour: action.payload,
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

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        {!state.isAuthenticated ? <Login /> : <Landing />}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
