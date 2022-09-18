const ADD_POST = 'ADD-POST';
const NEW_POST_CHANGE = 'NEW-POST-CHANGE';
const SET_PROFILE = 'SET-PROFILE';

const initialState = {
  posts: [
    {id: 1, message: "Life is beautiful!", likesCount: 15},
    {id: 2, message: "go to school", likesCount: 20},
    {id: 3, message: "What's going on?", likesCount: 5}
  ],
  newPostText: '',
  profile: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case (ADD_POST) :
      const post = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 10,
        date: "now"
      };
      return {...state, newPostText: '', posts: [...state.posts, post]};
    case (NEW_POST_CHANGE):
      return {...state, newPostText: action.newPostText};
    case (SET_PROFILE):
      return {...state, profile: action.profile};
    default:
      return state;
  }
}

export const newPostChangeActionCreator = (text) => {
  return {
    type: NEW_POST_CHANGE, newPostText: text
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})

export default profileReducer;