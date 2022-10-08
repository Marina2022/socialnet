import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    isEditMode: false,
    status: null as string | null
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case (ADD_POST) :
            const post = {
                id: state.posts.length + 1,
                message: action.postText,
                likesCount: 10,
                date: "now"
            };
            return {...state, posts: [...state.posts, post]};
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        case SET_PHOTOS:
            return {...state, profile: {...state.profile, photos: action.photos as PhotosType}}
        case IS_EDIT_MODE:
            return {...state, isEditMode: action.isEditMode}
        default:
            return state;
    }
}

type AddPostActionCreatorActionType = {type: typeof ADD_POST, postText: string}
export const addPostActionCreator = (postText: string):AddPostActionCreatorActionType => ({type: ADD_POST, postText})

type DeletePostActionType = {type: typeof DELETE_POST, id: number}
export const deletePostAC = (id: number):DeletePostActionType => ({type: DELETE_POST, id})

type SetProfileActionType = {type: typeof SET_PROFILE, profile: ProfileType}
export const setProfile = (profile: ProfileType):SetProfileActionType => ({type: SET_PROFILE, profile})

type SetStatusActionType = {type: typeof SET_STATUS, status: string}
const setStatus = (status: string):SetStatusActionType => ({type: SET_STATUS, status})

type SetPhotosActionType = {type: typeof SET_PHOTOS, photos: PhotosType}
const setPhotos = (photos: PhotosType):SetPhotosActionType => ({type: SET_PHOTOS, photos})

type SetEditProfileModeActionType = {type: typeof IS_EDIT_MODE, isEditMode: boolean}
const setEditProfileMode = (isEditMode: boolean):SetEditProfileModeActionType => ({type: IS_EDIT_MODE, isEditMode})

export const startProfileEditMode = () => (dispatch: any) => {
    dispatch(setEditProfileMode(true))

}

export const getUser = (userId: number) => async (dispatch: any) => {
    const data = await profileApi.getUser(userId)
    dispatch(setProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const data = await profileApi.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) dispatch(setStatus(status))
}

export const updateAvatar = (file: any) => async (dispatch: any) => {
    const data = await
        profileApi.updateAvatar(file);
    if (data.data.resultCode === 0) dispatch(setPhotos(data.data.data.photos))
}

export const uploadProfileData = (formData: any) => (dispatch: any, getState: any) => {
    profileApi.uploadProfile(formData)
        .then(() => dispatch(getUser(getState().auth.userId)))
        .then(() => dispatch(setEditProfileMode(false)))
        .catch((err: string) => {
            const action = stopSubmit("profile", {_error: err});
            dispatch(action);
        })

}
export default profileReducer;