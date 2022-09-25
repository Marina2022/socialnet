import {authApi, usersApi} from "../api/api";

const SET_CURRENT_USER = 'SET-CURRENT-USER';

const initialState = {
  login: null,
  userId: null,
  email: null,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case  SET_CURRENT_USER:
      return {
        ...state,
        ...action.data,
        isAuth: true
      };
    default:
      return state;
  }
}

export const setCurrentUser = (id, login, email) => ({type: SET_CURRENT_USER, data: {id, login, email}})

export const getAuth = () => (dispatch) => authApi.getAuth()
  .then(data => {
    const {id, login, email} = data.data
    if (data.data.login) dispatch(setCurrentUser(id, login, email));
  })

export const authorize = (formData) => (dispatch) => authApi.authorize(formData)

  .then((data) => {
    console.log(data.resultCode)
    if (data.resultCode !== 0) getAuth()
      }
  )

export default authReducer;