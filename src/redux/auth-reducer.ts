import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_CURRENT_USER = 'SET-CURRENT-USER';
const INIT = 'INIT';


type InitialStateType = {
    login: string | null,
    userId: number | null,
    email: string | null,
    isAuth: boolean,
    initialized: boolean
}

const initialState: InitialStateType = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
    initialized: false
}

const authReducer = (state = initialState, action: any): InitialStateType => {
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

export const setCurrentUser = (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: SET_CURRENT_USER,
    data: {userId, login, email, isAuth}
})

export const getAuth = () => (dispatch: any) => {
    const data = authApi.getAuth();
    const {id, login, email} = data.data
    if (data.data.login) dispatch(setCurrentUser(id, login, email, true));
}

type setInitActionType = {
    type: typeof INIT, payload: boolean
}

const setInit = (initialized: boolean): setInitActionType => ({type: INIT, payload: initialized});

export const initialize = () => (dispatch: any) => {
    dispatch(getAuth())
        .then(() => {
                dispatch(setInit(true));
            }
        )
}

export const authorize = (formData: any) => (dispatch: any) => {
    const data = authApi.authorize(formData);
    if (data.resultCode === 0) {
        dispatch(getAuth());
    } else {
        dispatch(stopSubmit("login", {_error: data.messages[0]}))
    }
}


export const logout = () => async (dispatch: any) => {
    const data = await authApi.logout();
    if (data.resultCode === 0) {
        dispatch(setCurrentUser(null, null, null, false))
    }
}

export default authReducer;