import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileApi} from "../api/profileApi";
import {ProfileFormPropsType} from "../components/profile/profileInfo/ProfileForm";
import {BaseThunkType, InferActions} from "./redux-state";

const initialState = {
    posts: [
        {id: 1, message: "Life is very short and there's no time..", likesCount: 15},
        {id: 2, message: "Yes yes yes", likesCount: 20},
        {id: 3, message: "What's going on?", likesCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    isEditMode: false,
    status: null as string | null,
    isFetching: false
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST' :
            const post = {
                id: state.posts.length + 1,
                message: action.postText,
                likesCount: 10,
                date: "now"
            };
            return {...state, posts: [...state.posts, post]};
        case 'SET-PROFILE':
            return {...state, profile: action.profile};
        case 'SET-STATUS':
            return {...state, status: action.status};
        case 'DELETE-POST':
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        case 'SET-PHOTOS':
            return {...state, profile: {...state.profile, photos: action.photos as PhotosType}}
        case "IS-EDIT-MODE":
            return {...state, isEditMode: action.isEditMode}
        case "IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const ProfileReducerACs = {
    addPostActionCreator: (postText: string) => ({type: 'ADD-POST', postText} as const),
    deletePostAC: (id: number) => ({type: 'DELETE-POST', id} as const),
    setProfile: (profile: ProfileType) => ({type: 'SET-PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET-STATUS', status} as const),
    setPhotos: (photos: PhotosType) => ({type: 'SET-PHOTOS', photos} as const),
    setEditProfileMode: (isEditMode: boolean) => ({type: 'IS-EDIT-MODE', isEditMode} as const),
    isFetching: (isFetching: boolean)=>({type: 'IS-FETCHING', isFetching} as const)
}

export const startProfileEditMode = ():BaseThunkType<ActionsTypes, void> => (dispatch) => {
    console.log('дошла ли досюда-то?')
    dispatch(ProfileReducerACs.setEditProfileMode(true))
}

export const getUser = (userId: number|null):thunkType => async (dispatch) => {
    const data = await profileApi.getUser(userId)
    dispatch(ProfileReducerACs.setProfile(data))
    dispatch(ProfileReducerACs.isFetching(false))
}

export const getStatus = (userId: number):thunkType => async (dispatch) => {
    const data = await profileApi.getStatus(userId)
    dispatch(ProfileReducerACs.setStatus(data))
}

export const updateStatus = (status: string):thunkType => async (dispatch) => {
    const data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) dispatch(ProfileReducerACs.setStatus(status))
}

export const updateAvatar = (file: File):thunkType => async (dispatch) => {
    const data = await
        profileApi.updateAvatar(file);
    if (data.resultCode === 0) dispatch(ProfileReducerACs.setPhotos(data.data.photos))
}

export const uploadProfileData = (formData: ProfileFormPropsType):BaseThunkType<ActionsTypes, void> => (dispatch, getState) => {
    profileApi.uploadProfile(formData)
        .then(() => dispatch(getUser(getState().auth.userId)))
        .then(() => dispatch(ProfileReducerACs.setEditProfileMode(false)))
        .catch((err: string) => {

            // @ts-ignore
            dispatch(stopSubmit("profile", {_error: err}));
        })

}
export default profileReducer;


type ActionsTypes = InferActions<typeof ProfileReducerACs>
type thunkType = BaseThunkType<ActionsTypes>