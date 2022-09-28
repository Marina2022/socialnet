import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_CURRENT_USER = 'SET-CURRENT-USER';
const INIT = 'INIT';

const initialState = {
  login: null,
  userId: null,
  email: null,
  isAuth: false,
  initialized: false
}

const authReducer = (state = initialState, action) => {
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

export const setCurrentUser = (userId, login, email, isAuth) => ({
  type: SET_CURRENT_USER,
  data: {userId, login, email, isAuth}
})

export const getAuth = () => (dispatch) => {
  return authApi.getAuth()
    .then(data => {
      const {id, login, email} = data.data
      if (data.data.login) dispatch(setCurrentUser(id, login, email, true));
    })
}

const setInit = (initialized) =>  ({type: INIT, payload: initialized});


export const initialize = () => (dispatch) => {
  dispatch(getAuth())
    .then(() => {
        dispatch(setInit(true));

      }
    )
}

export const authorize = (formData) => (dispatch) => authApi.authorize(formData)
  .then((data) => {
      if (data.resultCode === 0) {
        dispatch(getAuth());
      } else {
        dispatch(stopSubmit("login", {_error: data.messages[0]}))
      }
    }
  )

export const logout = () => (dispatch) => authApi.logout()
  .then((data) => {
    if (data.resultCode === 0) {
      dispatch(setCurrentUser(null, null, null, false))
    }
  })

export default authReducer;