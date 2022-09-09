
const posts = [
  {id: 1, message: "Life is beautiful!", likesCount: 15},
  {id: 2, message: "go to school", likesCount: 20},
  {id: 3, message: "What's going on?", likesCount: 5},
]

const messages = [
  {id:1, message: "Hi", me: true, name: "Marina I.", date: "3 days ago"},
  {id:2, message: "Hey", me: false, name: "Dima", date: "3 days ago"},
  {id:3, message: "Why don't you come to me?", me: true, name: "Marina I", date: "3 days ago"},
]

const dialogs = [
  {id:1, name: "Dima", avatar: "https://themified.com/friend-finder/images/users/user-4.jpg"},
  {id:2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
  {id:3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
  {id:4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
  {id:5, name: "Alena", avatar: "https://themified.com/friend-finder/images/users/user-2.jpg"},
]

const friends =[
  {id:2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
  {id:3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
  {id:4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
]

function addPost() {
  const message = {
    id: this._state.profilePage.posts.length + 1,
    message: this._state.profilePage.newPostText,
    likesCount: 0,
    date: "now"
  };
  this._state.profilePage.posts.push(message);
  this._state.profilePage.newPostText ='';
  this._subscriber(this);
}

function newPostTextChange(newText) {
  this._state.profilePage.newPostText = newText;
  this._subscriber(this);
}

function newMessageTextChange (newMessage) {
  this._state.dialogPage.newMessageText = newMessage;
  this._subscriber(this);
}

const store = {
  _state: {
    profilePage: {posts, newPostText: 'mara'},
    dialogPage: {messages, dialogs, newMessageText:''},
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
  subscribe (observer) {
    this._subscriber = observer;
  },
  addPost,
  newPostTextChange,
  newMessageTextChange,
}

window.state = store.getState();

export default store;