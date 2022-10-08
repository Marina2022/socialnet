const ADD_MESSAGE = 'ADD-MESSAGE';

type MessageType = {
  id: number,
  message: string,
  me: boolean,
  name: string,
  date: string
}

type DialogType = {
  id: number,
  name: string,
  avatar: string
}

const initialState = {
  messages: [
    {id: 1, message: "Hi", me: true, name: "Marina I.", date: "3 days ago"},
    {id: 2, message: "Hey", me: false, name: "Dima", date: "3 days ago"},
    {id: 3, message: "Why don't you come to me?", me: true, name: "Marina I", date: "3 days ago"},
  ] as Array<MessageType>,
  dialogs: [
    {id: 1, name: "Dima", avatar: "https://themified.com/friend-finder/images/users/user-4.jpg"},
    {id: 2, name: "Sasha", avatar: "https://themified.com/friend-finder/images/users/user-8.jpg"},
    {id: 3, name: "Anna", avatar: "https://themified.com/friend-finder/images/users/user-9.jpg"},
    {id: 4, name: "Dasha", avatar: "https://themified.com/friend-finder/images/users/user-3.jpg"},
    {id: 5, name: "Alena", avatar: "https://themified.com/friend-finder/images/users/user-2.jpg"},
  ] as Array<DialogType>,
  newMessageText: '',
}


type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    case (ADD_MESSAGE) :
      const me = Boolean((state.messages.length + 1) % 2);
      const message = {
        id: state.messages.length + 1,
         message: action.text,
        me: me,
        name: me ? "Marina I." : "Dima",
        date: "now"
      };
      return {...state, newMessageText: '', messages: [...state.messages, message] };
    default:
      return state;
  }
}

type addMessageActionCreatorType = {
  type: typeof ADD_MESSAGE,
  text: string
}
export const addMessageActionCreator = (text: string):addMessageActionCreatorType => ({type: ADD_MESSAGE, text: text});

export default dialogsReducer;