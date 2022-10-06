import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';
const SET_PHOTOS = 'SET-PHOTOS';
const IS_EDIT_MODE = 'IS-EDIT-MODE'

const initialState = {
  posts: [
    {id: 1, message: "Life is beautiful!", likesCount: 15},
    {id: 2, message: "go to school", likesCount: 20},
    {id: 3, message: "What's going on?", likesCount: 5}
  ],
  profile: null,
  isEditMode: false,

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
    case(DELETE_POST):
      return {...state, posts: state.posts.filter(post => post.id !== action.id)}
    case(SET_PHOTOS):
      return {...state, profile: {...state.profile, photos: action.photos}}
    case(IS_EDIT_MODE):
      return {...state, isEditMode: action.isEditMode}
    default:
      return state;
  }
}

export const addPostActionCreator = (postText) => ({type: ADD_POST, postText})
export const deletePostAC = (id)=>({type: DELETE_POST, id})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})
const setStatus = (status)=> ({type: SET_STATUS, status})
const setPhotos = (photos) => ({type: SET_PHOTOS, photos})

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

export const updateAvatar = (file) => dispatch => {
  profileApi.updateAvatar(file)
    .then((data) => {
      if (data.data.resultCode === 0) dispatch(setPhotos(data.data.data.photos))
    })
}

const setEditProfileMode = (isEditMode)=> ({type: IS_EDIT_MODE, isEditMode})

export const startProfileEditMode = () => (dispatch, getState) => {
  dispatch(setEditProfileMode(true))

}

export const uploadProfileData = (formData) => (dispatch, getState) => {
  profileApi.uploadProfile(formData)
    .then(()=>dispatch(getUser(getState().auth.userId)))
    .then(()=>dispatch(setEditProfileMode(false)))
    .catch(err=>{
      const action = stopSubmit("profile", {_error: err});
      dispatch(action);

      console.log(err);
    })

}
export default profileReducer;