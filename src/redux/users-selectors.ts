import {GlobalStateType} from "./redux-state";

export const getUsers = (state: GlobalStateType) => {
  return state.usersPage.users;
}

export const getPageCount = (state: GlobalStateType) => {
  return state.usersPage.pageCount;
}

export const getCurrentPage = (state: GlobalStateType) => {
  return state.usersPage.currentPage;
}

export const getUsersFilter = (state: GlobalStateType) => {
  return state.usersPage.filter;
}

export const getTotalPageCount = (state: GlobalStateType) => {
  return state.usersPage.totalPageCount;
}

export const getIsFetching = (state: GlobalStateType) => {
  return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: GlobalStateType) => {
  return state.usersPage.followingInProgress;
}
