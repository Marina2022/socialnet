import {
  follow,
  setCurrentPage,
  toggleFollowingInProgress, requestUsers, unfollow
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/preloader";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageCount,
  getTotalPageCount,
  getUsers
} from "../../redux/users-selectors";

class usersContainer extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0 ) {
    this.props.requestUsers(this.props.pageCount, this.props.currentPage);
    }
  }

  onPageClick = (page)=> {
    if (page === this.props.currentPage) return;
    this.props.setCurrentPage(page);
    this.props.requestUsers(this.props.pageCount, page);  // thunk в редюсере
  }

  render () {
    return <>
      {this.props.isFetching ? <Preloader /> : <Users onPageClick={this.onPageClick} {...this.props} />}
    </>
  }
}

const mapStateToProps = (state) => ({
  //users: state.usersPage.users,
  users: getUsers(state),
  pageCount: getPageCount(state),
  currentPage: getCurrentPage(state),
  totalPageCount: getTotalPageCount(state),
  isFetching: getIsFetching(state),
  followingInProgress: getFollowingInProgress(state)
});

const objForConnect = {
  follow, toggleFollowingInProgress, setCurrentPage, requestUsers, unfollow
}


export default connect(mapStateToProps, objForConnect)(usersContainer);
