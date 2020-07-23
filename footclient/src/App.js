import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/views/Login";
import Dashboard from "./components/views/Dashboard";
import Register from "./components/views/Register";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Context } from "../src/components/Store";
import Store from "./components/Store";
import { useSpring, animated } from "react-spring";

const App = () => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });
  return (
    <animated.div className="App" style={fade}>
      <Router>
        <Store>
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Context.Consumer>
              {(ctr) => (
                <Route path="/">
                  {ctr[0].isAuthenticated ? <Dashboard /> : <Login />}
                </Route>
              )}
            </Context.Consumer>
          </Switch>
        </Store>
      </Router>
    </animated.div>
  );
};

export default App;
