const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_PAGE_COUNT = 'SET-TOTAL-PAGE-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';

const initialState = {
  users: [],
  currentPage: 5,
  pageCount: 5,
  totalPageCount: 0
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
    default:
      return state;
  }
}


export const setUsersAC = (users)=>({type: 'SET-USERS', users});
export const followAC = (userId)=>({type: 'FOLLOW', userId})
export const setTotalPageCountAC = (totalCount)=>({type: SET_TOTAL_PAGE_COUNT, totalCount})
export const setCurrentPageAC = (page)=>({type: SET_CURRENT_PAGE, page})

export default usersReducer;