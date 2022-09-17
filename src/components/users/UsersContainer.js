import {followAC, setCurrentPageAC, setTotalPageCountAC, setUsersAC} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  pageCount: state.usersPage.pageCount,
  currentPage: state.usersPage.currentPage,
  totalPageCount: state.usersPage.totalPageCount,
});

const mapDispatchToProps = (dispatch) => ({
  follow: (userId)=>dispatch(followAC(userId)),
  setUsers: (users)=>dispatch(setUsersAC(users)),
  setTotalPageCount: (totalCount)=>dispatch(setTotalPageCountAC(totalCount)),
  setCurrentPage: (page)=>dispatch(setCurrentPageAC(page)),

})

const usersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default usersContainer;
