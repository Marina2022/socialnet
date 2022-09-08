import "./App.css";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from "./components/profile/Profile";
import Dialogs from "./components/dialogs/Dialog";
import Settings from "./components/settings/Settings";
import Music from "./components/music/Music";
import News from "./components/news/News";


const App = ({state, addPost, newPostTextChange, newMessageTextChange}) => {

  return (
    <Router>
      <div className="app-wrapper">
        <Header/>
        <Navbar friends={state.navbarPage.friends} />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" element={<Dialogs state={state.dialogPage} newMessageTextChange={newMessageTextChange}/>}/>
            <Route path="/profile" element={<Profile
                posts={state.profilePage.posts}
                addPost={addPost}
                newPostTextChange={newPostTextChange}
                newPostText={state.profilePage.newPostText}
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

