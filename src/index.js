import ReactDOM from "react-dom/client";
import "./index.css";
//import store from "./redux/state";
import store from "./redux/redux-state";
import React from "react";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerender = (state) => {
  root.render(
    <Router>
      <React.StrictMode>
        <App store={store}/>
      </React.StrictMode>
    </Router>
  );
}

rerender(store.getState());

store.subscribe(()=>rerender(store.getState()));


