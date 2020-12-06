import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import generateStore from "./redux/store.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const store = generateStore();
const currentStore = store.getState();
const userData = currentStore.users.currentUser;

console.log("store", store.getState());

const existUserData = userData.name;
// const ValidateLogin = existUserData ? <App /> : <Login />
const ValidateLogin = existUserData ? <App /> : <App />;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>{ValidateLogin}</Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
