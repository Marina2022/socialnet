import {ResultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {GlobalStateType} from "./redux-state";
import {authApi} from "../api/authApi";

const SET_CURRENT_USER = 'SET-CURRENT-USER';
const INIT = 'INIT';


const initialState = {
    login: null as string | null,
    userId: null as number | null,
    email: null as string | null,
    isAuth: false,
    initialized: false
}

export type InitialStateType = typeof initialState;


//type ActionsType = SetCurrentUserActionType | setInitActionType | StopSubmitType
type ActionsType = SetCurrentUserActionType | setInitActionType

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case  SET_CURRENT_USER:
            return {
                ...state,
                ...action.data,
            };
        case INIT:
            return {
                ...state,
                initialized: action.payload,
            }
        default:
            return state;
    }
}

type SetCurrentUserPayloadType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}

type SetCurrentUserActionType = {
    type: typeof SET_CURRENT_USER,
    data: SetCurrentUserPayloadType
}
export const setCurrentUser = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetCurrentUserActionType => ({
    type: SET_CURRENT_USER,
    data: {userId, login, email, isAuth}
})

type setInitActionType = {
    type: typeof INIT, payload: boolean
}
const setInit = (initialized: boolean): setInitActionType => ({type: INIT, payload: initialized});


export const getAuth = () => async (dispatch: any) => {
    const data = await authApi.getAuth();
    const {id, login, email} = data.data
    if (data.data.login) dispatch(setCurrentUser(id, login, email, true));
}

type ThunkType = ThunkAction<Promise<void>, GlobalStateType, unknown,  ActionsType>

export const initialize = ():ThunkType => async (dispatch) => {
    await dispatch(getAuth())
    dispatch(setInit(true))
}

export const authorize = (formData: any):ThunkType => async (dispatch) => {
    const data = await authApi.authorize(formData);
    if (data.resultCode === ResultCodeEnum.success) {
      await dispatch(getAuth());
    } else {
        // @ts-ignore
        await dispatch(stopSubmit("login", {_error: data.messages[0]}))
    }
}

export const logout = ():ThunkType=> async (dispatch) => {
    const data = await authApi.logout();
    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(setCurrentUser(null, null, null, false))
    }
}

export default authReducer;