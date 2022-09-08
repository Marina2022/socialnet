//import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import rerender from "./render"
import state, {addPost, newMessageTextChange, newPostTextChange} from "./redux/state";

rerender(state, addPost, newPostTextChange, newMessageTextChange);


