const ADD_POST = 'ADD-POST';
const NEW_POST_CHANGE = 'NEW-POST-CHANGE';

const initialState = {
  posts: [
    {id: 1, message: "Life is beautiful!", likesCount: 15},
    {id: 2, message: "go to school", likesCount: 20},
    {id: 3, message: "What's going on?", likesCount: 5}
  ],
  newPostText: ''
}

const profileReducer = (state =initialState, action) => {
  switch (action.type) {
    case (ADD_POST) :
      const post = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 10,
        date: "now"
      };
      state.posts.push(post);
      state.newPostText = '';
      return state;
    case (NEW_POST_CHANGE):
      state.newPostText = action.newPostText;
      return state;
    default:
      return state;
  }
}

export const newPostChangeActionCreator = (text) => ({
  type: NEW_POST_CHANGE, newPostText: text
})

export const addPostActionCreator = () => ({type: ADD_POST})

export default profileReducer;