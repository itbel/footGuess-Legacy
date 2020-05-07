import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Login className="login" />
        <Switch></Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
