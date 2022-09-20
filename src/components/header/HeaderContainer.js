import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setCurrentUser} from "../../redux/auth-reducer";
import axios from "axios";


class HeaderContainer extends React.Component {
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
      .then(response=>{
        const {id, login, email} = response.data.data
        if(response.data.data.login) this.props.setCurrentUser(id, login, email);
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
