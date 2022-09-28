import {Route, Routes} from 'react-router-dom'

import "./App.css";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import Settings from "./components/settings/Settings";
import Music from "./components/music/Music";
import News from "./components/news/News";
import NavbarContainer from "./components/navbar/NavbarContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/Login";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {initialize} from "./redux/auth-reducer";
import Preloader from "./components/common/preloader";
import React from 'react'

// eslint-disable-next-line no-undef
class App extends React.Component {

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
          <Routes>
            <Route path="/dialogs/*"
                   element={<DialogsContainer/>}/>
            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
            <Route path="/profile" element={<ProfileContainer/>}/>
            <Route path="/users" element={<UsersContainer/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  initialized: state.auth.initialized
})
export default connect(mapStateToProps, {initialize})(App);

