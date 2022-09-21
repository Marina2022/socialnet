import {
  follow,
  setCurrentPage,
  toggleFollowingInProgress, getUsers
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/preloader";

class usersContainer extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0 ) {
    this.props.getUsers(this.props.pageCount, this.props.currentPage);
    }
  }

  onPageClick = (page)=> {
    if (page === this.props.currentPage) return;
    this.props.setCurrentPage(page);
    this.props.getUsers(this.props.pageCount, page);  // thunk в редюсере
  }

  render () {
    return <>
      {this.props.isFetching ? <Preloader /> : <Users onPageClick={this.onPageClick} {...this.props} />}
    </>
  }
}

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  pageCount: state.usersPage.pageCount,
  currentPage: state.usersPage.currentPage,
  totalPageCount: state.usersPage.totalPageCount,
  isFetching: state.usersPage.isFetching,
  followingInProgress: state.usersPage.followingInProgress
});

const objForConnect = {
  follow, setCurrentPage, toggleFollowingInProgress, getUsers
}


export default connect(mapStateToProps, objForConnect)(usersContainer);
