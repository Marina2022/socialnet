import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
//import {addPost} from "./redux/state";

const root = ReactDOM.createRoot(document.getElementById("root"));

const rerender  = (state, addPost, newPostTextChange, newMessageTextChange) => {

  root.render(
    <React.StrictMode>
      <App state = {state} addPost={addPost} newPostTextChange={newPostTextChange} newMessageTextChange={newMessageTextChange}/>
    </React.StrictMode>
  );
}


export  default  rerender;