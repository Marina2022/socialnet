import {FilterType, UserType} from "../types/types";
import {BaseThunkType, InferActions} from "./redux-state";
import {usersApi} from "../api/usersApi";
import {AnyAction} from "redux";


const initialState = {
  users: [] as Array<UserType>,
  currentPage: Math.ceil(Math.random()*1414),
  pageCount: 15,
  totalPageCount: 0,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

export type InitialStateType = typeof initialState;


export const UserReducerACs = {
  setUsers: (users: Array<UserType>) => ({type: 'SET-USERS', users} as const),
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  setTotalPageCount: (totalCount: number) => ({type: 'SET-TOTAL-PAGE-COUNT', totalCount} as const),
  setCurrentPage: (page: number) => ({type: 'SET-CURRENT-PAGE', page} as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const),
  setFilter: (filter: FilterType) => ({type: 'SET-FILTER', filter} as const),
  toggleFollowingInProgress: (isFetching: boolean, id: number) => ({
    type: 'TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    id
  } as const),
}

type ActionsTypes = InferActions<typeof UserReducerACs>


const usersReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state, users: state.users.map(u => {
            if (u.id === action.userId) {
              return {...u, followed: !u.followed};
            }
            return u;
          }
        )
      }
    case "SET-USERS":
      return {...state, users: [...action.users]}
    case 'SET-TOTAL-PAGE-COUNT':
      return {...state, totalPageCount: action.totalCount}
    case "SET-CURRENT-PAGE":
      return {...state, currentPage: action.page}
    case "TOGGLE-IS-FETCHING":
      return {...state, isFetching: action.isFetching}
    case "TOGGLE-FOLLOWING-PROGRESS":
      return {
        ...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.id]
          : state.followingInProgress.filter(id => id !== action.id)
      }
    case "SET-FILTER":
      return {
        ...state, filter: action.filter
      }
    default:
      return state;
  }
}

export type ThunkType = BaseThunkType<ActionsTypes>

//export const requestUsers = (pageCount: number, currentPage: number, filter: FilterType): ThunkType => {
export const requestUsers = (pageCount: number, currentPage: number, filter: FilterType):ThunkType => {
  return async (dispatch, getState ) => {
    dispatch(UserReducerACs.toggleIsFetching(true));
    dispatch(UserReducerACs.setFilter(filter));
    const data = await usersApi.getUsers(pageCount, currentPage, filter);
        dispatch(UserReducerACs.setUsers(data.items));
        dispatch(UserReducerACs.setTotalPageCount(Math.ceil(data.totalCount / pageCount)));
        dispatch(UserReducerACs.toggleIsFetching(false))
  }
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(UserReducerACs.toggleFollowingInProgress(true, userId));
    const data = await usersApi.follow(userId);
    if (data.resultCode === 0) dispatch(UserReducerACs.followSuccess(userId));
    dispatch(UserReducerACs.toggleFollowingInProgress(false, userId));
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(UserReducerACs.toggleFollowingInProgress(true, userId));
    const data = await usersApi.unfollow(userId);
    if (data.resultCode === 0) dispatch(UserReducerACs.followSuccess(userId));
    dispatch(UserReducerACs.toggleFollowingInProgress(false, userId));
  }
}

export default usersReducer;