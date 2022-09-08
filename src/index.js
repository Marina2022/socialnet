//import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//import rerender from "./render"
import state, {addPost, newMessageTextChange, newPostTextChange} from "./redux/state";
import React from "react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const rerender  = (state, addPost, newPostTextChange, newMessageTextChange) => {
  root.render(
    <React.StrictMode>
      <App state = {state} addPost={addPost} rerender={rerender} newPostTextChange={newPostTextChange} newMessageTextChange={newMessageTextChange}/>
    </React.StrictMode>
  );
}

rerender(state, addPost, newPostTextChange, newMessageTextChange);


