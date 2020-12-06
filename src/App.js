import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "./pages/home";
import Login from "./pages/login";
import SingUp from "./pages/sing-up";
import ShoppingList from "./pages/shopping-list";
import Schedule from "./pages/schedule";

function App() {
  return (
    <div className="container-app">
      <Router style={{ height: "100%" }}>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route className="switch-wrapper" path="/login">
            <Login />
          </Route>
          <Route className="switch-wrapper" path="/sing-up">
            <SingUp />
          </Route>
          <Route className="switch-wrapper" path="/home">
            <Home />
          </Route>
          <Route className="switch-wrapper" path="/schedule">
            <Schedule />
          </Route>
          <Route className="switch-wrapper" path="/shopping-list">
            <ShoppingList />
          </Route>
        </AnimatedSwitch>
      </Router>
    </div>
  );
}

export default App;
