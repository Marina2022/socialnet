import {Routes, Route} from 'react-router-dom'

import "./App.css";
import Header from "./components/header/Header";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import Settings from "./components/settings/Settings";
import Music from "./components/music/Music";
import News from "./components/news/News";
import NavbarContainer from "./components/navbar/NavbarContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";


const App = () => {
  return (
      <div className="app-wrapper">
        <Header/>
        <NavbarContainer />

        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*"
                   element={<DialogsContainer/>}/>
            <Route path="/profile/*" element={<ProfileContainer/> } />
            <Route path="/users" element={<UsersContainer/> } />

            <Route path="/news" element={<News/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>
      </div>
  );
};

export default App;

