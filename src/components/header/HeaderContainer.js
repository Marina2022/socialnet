import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuth, setCurrentUser} from "../../redux/auth-reducer";
import usersApi from "../../api/api";


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuth();

  }

  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  email: state.auth.email,
  id: state.auth.id,
})
export default connect(mapStateToProps, {setCurrentUser, getAuth})(HeaderContainer);
