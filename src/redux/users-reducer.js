const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

const initialState = {
  users: []
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
      return {...state, users: [...state.users, ...action.users]}

    default:
      return state;
  }
}



export const setUsersAC = (users)=>({type: 'SET-USERS', users});
export const followAC = (userId)=>({type: 'FOLLOW', userId})
// export const unfollowAC = (userId)=>({type: 'UNFOLLOW', userId})

export default usersReducer;