import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/state";
import React from "react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerender = (store) => {
  root.render(
    <React.StrictMode>
      <App store={store}
      />
    </React.StrictMode>
  );
}

rerender(store);

store.subscribe(rerender);


