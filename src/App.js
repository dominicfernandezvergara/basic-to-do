import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "./pages/home";

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
          <Route className="switch-wrapper" path="/home">
            <Home />
          </Route>
        </AnimatedSwitch>
      </Router>
    </div>
  );
}

export default App;
