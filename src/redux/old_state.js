import profileReducer from "./profile-reducer";
import navbarReducer from "./navbar-reducer";
import dialogsReducer from "./dialogs-reducer";

const posts = [
  {id: 1, message: "Life is beautiful!", likesCount: 15},
  {id: 2, message: "go to school", likesCount: 20},
  {id: 3, message: "What's going on?", likesCount: 5},
]

const messages = [
  {id: 1, message: "Hi", me: true, name: "Marina I.", date: "3 days ago"},
  {id: 2, message: "Hey", me: false, name: "Dima", date: "3 days ago"},
  {id: 3, message: "Why don't you come to me?", me: true, name: "Marina I", date: "3 days ago"},
]

const dialogs = [
  {id: 1, name: "Dima", avatar: "https://themified.com/friend-finder/images/users/user-4.jpg"},
  {id: 2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
  {id: 3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
  {id: 4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
  {id: 5, name: "Alena", avatar: "https://themified.com/friend-finder/images/users/user-2.jpg"},
]

const friends = [
  {id: 2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
  {id: 3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
  {id: 4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
]


const store = {
  _state: {
    profilePage: {posts, newPostText: ''},
    dialogPage: {messages, dialogs, newMessageText: ''},
    navbarPage: {friends},
  },
  getState() {
    return this._state;
  },
  setState(state) {
    this._state = state;
  },
  _subscriber() {
    console.log('тут должно перерендериваться');
  },
  subscribe(observer) {
    this._subscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);
    this._state.navbarPage = navbarReducer(this._state.navbarPage, action);

    this._subscriber(this._state);
  }



  }




window.state = store.getState();

export default store;