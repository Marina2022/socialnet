import {usersApi} from "../api/api";
import {UserType} from "../types/types";
import {GlobalStateType} from "./redux-state";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const SET_USERS = 'auth/SET-USERS';
const SET_TOTAL_PAGE_COUNT = 'SET-TOTAL-PAGE-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  currentPage: Math.ceil(Math.random()*1414),
  pageCount: 15,
  totalPageCount: 0,
  isFetching: false,
  followingInProgress: [] as Array<number>,
}

type InitialStateType = typeof initialState;

type ActionsType = SetUsersActionType | FollowSuccessActionType | SetTotalPageCountActionType |
    SetCurrentPageActionType | ToggleIsFetchingActionType | ToggleFollowingInProgressActionType

const usersReducer = (state = initialState, action: ActionsType):InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state, users: state.users.map(u => {
            if (u.id === action.userId) {
              return {...u, followed: !u.followed};
            }
            return u;
          }
        )
      }
    case SET_USERS:
      return {...state, users: [...action.users]}
    case SET_TOTAL_PAGE_COUNT:
      return {...state, totalPageCount: action.totalCount}
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.page}
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching}
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.id]
          : state.followingInProgress.filter(id => id !== action.id)
      }
    default:
      return state;
  }
}

type SetUsersActionType = {type: typeof SET_USERS, users: Array<UserType>}
export const setUsers = (users: Array<UserType>):SetUsersActionType => ({type: SET_USERS, users});

type FollowSuccessActionType = {type: typeof FOLLOW, userId: number}
export const followSuccess = (userId: number):FollowSuccessActionType => ({type: 'FOLLOW', userId})

type SetTotalPageCountActionType = {type: typeof SET_TOTAL_PAGE_COUNT, totalCount: number}
export const setTotalPageCount = (totalCount: number):SetTotalPageCountActionType => ({type: SET_TOTAL_PAGE_COUNT, totalCount})

type SetCurrentPageActionType = {type: typeof SET_CURRENT_PAGE, page: number}
export const setCurrentPage = (page: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, page})

type ToggleIsFetchingActionType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingInProgressActionType = {type: typeof TOGGLE_FOLLOWING_PROGRESS, isFetching: boolean, id: number}
export const toggleFollowingInProgress = (isFetching: boolean, id: number):ToggleFollowingInProgressActionType => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, id})

type ThunkType = ThunkAction<Promise<void>,GlobalStateType, unknown, ActionsType>

export const requestUsers = (pageCount: number, currentPage: number): ThunkType => {
  return async (dispatch, getState ) => {
    dispatch(toggleIsFetching(true));
    const data = await usersApi.getUsers(pageCount, currentPage);
        dispatch(setUsers(data.items));
        dispatch(setTotalPageCount(Math.ceil(data.totalCount / pageCount)));
        dispatch(toggleIsFetching(false))
  }
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersApi.follow(userId);
    if (data.resultCode === 0) dispatch(followSuccess(userId));
    dispatch(toggleFollowingInProgress(false, userId));
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    const data = await usersApi.unfollow(userId);
    if (data.resultCode === 0) dispatch(followSuccess(userId));
    dispatch(toggleFollowingInProgress(false, userId));
  }
}

export default usersReducer;