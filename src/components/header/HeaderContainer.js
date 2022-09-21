import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/auth-reducer";
import usersApi from "../../api/api";


class HeaderContainer extends React.Component {

  componentDidMount() {
    usersApi.getAuth()
      .then(data=>{
        const {id, login, email} = data.data
        if(data.data.login) this.props.setCurrentUser(id, login, email);
      })
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
export default connect(mapStateToProps, {setCurrentUser})(HeaderContainer);
