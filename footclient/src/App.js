import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import Register from "./components/views/Register";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// these can be their own components
export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: undefined,
  userid: undefined,
  selectedTourName: undefined,
  selectedTourId: undefined,
  joinedTournaments: [],
  allTournaments: [],
  ownedTournaments: [],
  teams: [],
  matches: [],
  isUpdating: false,
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

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // read up on react-router-dom nested routes
  return (
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/">
              {state.isAuthenticated ? <Dashboard /> : <Login />}
            </Route>
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
