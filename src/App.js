import {Routes, Route} from 'react-router-dom'

import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import DialogsContainer from "./components/dialogs/DialogsContainer";
import Settings from "./components/settings/Settings";
import Music from "./components/music/Music";
import News from "./components/news/News";


const App = ({store}) => {
  return (
      <div className="app-wrapper">
        <Header/>
        <Navbar friends={store.getState().navbarPage.friends} />

        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*"
                   element={<DialogsContainer
                     store = {store}
                   />}/>
            <Route path="/profile" element={<Profile store = {store}/> } />
            <Route path="/news" element={<News/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>
      </div>
  );
};

export default App;

