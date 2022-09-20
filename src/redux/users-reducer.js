const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_PAGE_COUNT = 'SET-TOTAL-PAGE-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

const initialState = {
  users: [],
  currentPage: 4195,
  pageCount: 5,
  totalPageCount: 0,
  isFetching: false,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {...state, users: state.users.map(u=>{
          if (u.id===action.userId) {
            return {...u, followed: !u.followed};
          }
          return u;
          }
        )}
    case SET_USERS:
      return {...state, users: [...action.users]}

    case SET_TOTAL_PAGE_COUNT:
      return {...state, totalPageCount: action.totalCount}

    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.page}
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching}
    default:
      return state;
  }
}


export const setUsers = (users)=>({type: 'SET-USERS', users});
export const follow = (userId)=>({type: 'FOLLOW', userId})
export const setTotalPageCount = (totalCount)=>({type: SET_TOTAL_PAGE_COUNT, totalCount})
export const setCurrentPage = (page)=>({type: SET_CURRENT_PAGE, page})
export const toggleIsFetching = (isFetching)=>({type: TOGGLE_IS_FETCHING, isFetching})

export default usersReducer;