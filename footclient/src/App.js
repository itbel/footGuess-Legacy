import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import Register from "./components/views/Register";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: undefined,
  userid: undefined,
  selectedTour: undefined,
  joinedTournaments: [],
  allTournaments: [],
  ownedTournaments: [],
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
    <div className="App">
      <Router>
        <AuthContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <Switch>
            <Route
              path="/"
              render={() => {
                if (state.isAuthenticated) {
                  return <Dashboard />;
                } else {
                  return <Login />;
                }
              }}
            />
            <Route
              path="/register"
              render={() => {
                return <Register />;
              }}
            />
          </Switch>
        </AuthContext.Provider>
      </Router>
    </div>
  );
}

export default App;
