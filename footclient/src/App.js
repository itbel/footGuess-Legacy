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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.name,
        userid: action.payload._id,
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
