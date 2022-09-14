import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/redux-state";
import React from "react";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";



const root = ReactDOM.createRoot(document.getElementById("root"));
const rerender = () => {
  root.render(
    <Router>
      {/*<React.StrictMode>*/}
        <Provider store={store}>
          <App />
        </Provider>
      {/*</React.StrictMode>*/}
    </Router>
  );
}

rerender();

//store.subscribe(()=>rerender());


