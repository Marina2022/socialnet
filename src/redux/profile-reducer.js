import {profileApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET-STATUS';

const initialState = {
  posts: [
    {id: 1, message: "Life is beautiful!", likesCount: 15},
    {id: 2, message: "go to school", likesCount: 20},
    {id: 3, message: "What's going on?", likesCount: 5}
  ],
  profile: null,

}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case (ADD_POST) :
      const post = {
        id: state.posts.length + 1,
        message: action.postText,
        likesCount: 10,
        date: "now"
      };
      return {...state, posts: [...state.posts, post]};
    case (SET_PROFILE):
      return {...state, profile: action.profile};
    case (SET_STATUS):
      return {...state, status: action.status};
    default:
      return state;
  }
}

export const addPostActionCreator = (postText) => ({type: ADD_POST, postText})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})
const setStatus = (status)=> ({type: SET_STATUS, status})

export const getUser = (userId) => (dispatch) => {
  profileApi.getUser(userId)
  .then(data => dispatch(setProfile(data)));
}

export const getStatus = (userId) => (dispatch) => {
  profileApi.getStatus(userId)
    .then(data=>dispatch(setStatus(data)));
}

export const updateStatus = (status) => (dispatch)=>{
  profileApi.updateStatus(status)
    .then((data) => {
      if (data.resultCode === 0) dispatch(setStatus(status))
    })
}

export default profileReducer;