import {followAC, setUsersAC} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
});

const mapDispatchToProps = (dispatch) => ({
  follow: (userId)=>dispatch(followAC(userId)),
  setUsers: (users)=>dispatch(setUsersAC(users)),
})

const usersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default usersContainer;
