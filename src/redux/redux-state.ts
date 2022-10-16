import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import navbarReducer from "./navbar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbarPage: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
})

type RootReducerType = typeof reducers;
export type GlobalStateType = ReturnType<RootReducerType>


type InferPropertiesType<T>  = T extends { [key:string]: infer U } ? U : never
export type InferActions<T extends {[key:string]: (...args: any[])=> any }>  = ReturnType<InferPropertiesType<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, GlobalStateType, unknown, A>

//const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppDispatch = typeof store.dispatch;

export default store;