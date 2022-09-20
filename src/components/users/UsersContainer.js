import {follow, toggleIsFetching, setCurrentPage, setTotalPageCount, setUsers} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import * as axios from "axios";
import Preloader from "../common/preloader";

class usersContainer extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.toggleIsFetching(true);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${this.props.currentPage}`,
        {withCredentials: true})
        .then(response => {
          this.props.setUsers(response.data.items);
          this.props.setTotalPageCount(Math.ceil(response.data.totalCount / this.props.pageCount));
          this.props.toggleIsFetching(false)
        })
    }
  }

  onPageClick = (page)=> {
    if (page === this.props.currentPage) return;
    this.props.setCurrentPage(page);
    this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${page}`,
      {withCredentials: true})
      .then(response => {
        this.props.setUsers(response.data.items);
        this.props.toggleIsFetching(false)
      });
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
});

const objForConnect = {
  follow, setUsers, setTotalPageCount, setCurrentPage, toggleIsFetching,
}


export default connect(mapStateToProps, objForConnect)(usersContainer);
