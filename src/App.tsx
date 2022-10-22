import {Route, Routes} from 'react-router-dom'
import "./App.css";

import Music from "./components/music/Music";

import NavbarContainer from "./components/navbar/NavbarContainer";
import {UsersPage} from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/Login";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {initialize} from "./redux/auth-reducer";
import Preloader from "./components/common/preloader";
import React, {lazy} from 'react'
import {GlobalStateType} from "./redux/redux-state";
const DialogsContainer = React.lazy(() => import ("./components/dialogs/DialogsContainer"))
const News = React.lazy(() => import ("./components/news/News"))
const ChatPage = lazy(()=>import("./components/pages/ChatPage/ChatPage"))

class App extends React.Component<MapStateProps & DispatchProps> {

  componentDidMount() {
    this.props.initialize();
  }

  render() {
    if (!this.props.initialized) return <Preloader/>
    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <NavbarContainer/>
        <div className="app-wrapper-content">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/dialogs/*"
                     element={<DialogsContainer/>}/>
              <Route path="/users" element={<UsersPage/>}/>
              <Route path="/profile/:userId" element={<ProfileContainer/>}/>
              <Route path="/profile" element={<ProfileContainer/>}/>
              <Route path="/news" element={<News/>}/>
              <Route path="/music" element={<Music/>}/>
              <Route path="/chat" element={<ChatPage/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </React.Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalStateType) => ({
  initialized: state.auth.initialized
})

type MapStateProps = {
  initialized: boolean
}

type DispatchProps = {
  initialize: ()=>void
}
export default connect<MapStateProps, DispatchProps, {}, GlobalStateType>(mapStateToProps, {initialize})(App);


