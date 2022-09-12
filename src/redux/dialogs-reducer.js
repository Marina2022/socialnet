const NEW_MESSAGE_TEXT_CHANGE = 'NEW-MESSAGE-TEXT-CHANGE';
const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
  messages: [
    {id: 1, message: "Hi", me: true, name: "Marina I.", date: "3 days ago"},
    {id: 2, message: "Hey", me: false, name: "Dima", date: "3 days ago"},
    {id: 3, message: "Why don't you come to me?", me: true, name: "Marina I", date: "3 days ago"},
  ],
  dialogs: [
    {id: 1, name: "Dima", avatar: "https://themified.com/friend-finder/images/users/user-4.jpg"},
    {id: 2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
    {id: 3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
    {id: 4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
    {id: 5, name: "Alena", avatar: "https://themified.com/friend-finder/images/users/user-2.jpg"},
  ],
  newMessageText: '',
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case (ADD_MESSAGE) :
      const me = Boolean((state.messages.length + 1) % 2);
      const message = {
        id: state.messages.length + 1,
        message: state.newMessageText,
        me: me,
        name: me ? "Marina I." : "Dima",
        date: "now"
      };
      state.messages.push(message);
      state.newMessageText = '';
      return state;
    case (NEW_MESSAGE_TEXT_CHANGE):
      state.newMessageText = action.text;
      return state;
    default:
      return state;
  }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const newMessageTextChangeActionCreator = (text) => ({type: NEW_MESSAGE_TEXT_CHANGE, text: text})

export default dialogsReducer;