import {usersApi} from "../api/api";

const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_PAGE_COUNT = 'SET-TOTAL-PAGE-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE-FOLLOWING-PROGRESS';

const initialState = {
  users: [],
  currentPage: 4195,
  pageCount: 5,
  totalPageCount: 0,
  isFetching: false,
  followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
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


export const setUsers = (users) => ({type: 'SET-USERS', users});
export const followSuccess = (userId) => ({type: 'FOLLOW', userId})
export const setTotalPageCount = (totalCount) => ({type: SET_TOTAL_PAGE_COUNT, totalCount})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingInProgress = (isFetching, id) => ({type: TOGGLE_FOLLOWING_PROGRESS, isFetching, id})

export const getUsers = (pageCount, currentPage) => {
  return (dispatch) => {
      dispatch(toggleIsFetching(true));
      usersApi.getUsers(pageCount, currentPage)
        .then(data => {
          dispatch(setUsers(data.items));
          dispatch(setTotalPageCount(Math.ceil(data.totalCount / pageCount)));
          dispatch(toggleIsFetching(false))
        })
  }
}

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
    usersApi.follow(userId)
      .then(data => {
        if (data.resultCode === 0) dispatch(followSuccess(userId));
        dispatch(toggleFollowingInProgress(false, userId));
      })
  }
}

export const unfollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleFollowingInProgress(true, userId));
    usersApi.unfollow(userId)
      .then(data => {
        if (data.resultCode === 0) dispatch(followSuccess(userId));
        dispatch(toggleFollowingInProgress(false, userId));
      })
  }
}

export default usersReducer;