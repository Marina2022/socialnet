import {followAC, setCurrentPageAC, setTotalPageCountAC, setUsersAC} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import React from "react";
import * as axios from "axios";

class usersContainer extends React.Component {

  componentDidMount() {
    if (this.props.users.length === 0) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${this.props.currentPage}`)
        .then(response => {
          this.props.setUsers(response.data.items);
          this.props.setTotalPageCount(Math.ceil(response.data.totalCount / this.props.pageCount));
        });
    }
  }

  onPageClick = (page)=> {
    this.props.setCurrentPage(page);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageCount}&page=${page}`)
      .then(response => {
        this.props.setUsers(response.data.items);
      });
  }

  render () {
    return <Users onPageClick={this.onPageClick} {...this.props} />
  }
}




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

export default connect(mapStateToProps, mapDispatchToProps)(usersContainer);
