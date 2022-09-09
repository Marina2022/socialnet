import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialog";
import Settings from "./components/settings/Settings";
import Music from "./components/music/Music";
import News from "./components/news/News";


const App = ({store}) => {
  return (
    <Router>
      <div className="app-wrapper">
        <Header/>
        <Navbar friends={store.getState().navbarPage.friends} />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*"
                   element={<Dialogs state={store.getState().dialogPage}
                   store={store}
                   />}/>
            <Route path="/profile" element={<Profile
                state={store.getState().profilePage}
                store={store}
              />}
            />
            <Route path="/news" element={<News/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

