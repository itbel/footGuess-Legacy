import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import Register from "./components/views/Register";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Context } from "../src/components/Store";
import Store from "./components/Store";

function App() {
  return (
    <div className="App">
      <Router>
        <Store>
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Context.Consumer>
              {(ctr) => (
                <Route path="/">
                  {console.log(ctr)}
                  {!ctr[0].isAuthenticated ? <Login /> : <Dashboard />}
                </Route>
              )}
            </Context.Consumer>
          </Switch>
        </Store>
      </Router>
    </div>
  );
}

export default App;
