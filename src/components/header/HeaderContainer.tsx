import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {GlobalStateType} from "../../redux/redux-state";
import {log} from "util";


class HeaderContainer extends React.Component<WholeHeaderProps> {
  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state: GlobalStateType) => ({
  id: state.auth.userId,
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  email: state.auth.email,

})


type HeaderMapToPropsType = {
  id: number | null
  isAuth: boolean
  login: string | null
  email: string | null
}

export type HeaderDispatchToPropsType = {
  logout: ()=>void
}

 export type HeaderOwnProps = {}

export type WholeHeaderProps = HeaderMapToPropsType & HeaderDispatchToPropsType & HeaderOwnProps

export default connect<HeaderMapToPropsType, HeaderDispatchToPropsType, HeaderOwnProps, GlobalStateType>(mapStateToProps, {logout})(HeaderContainer);

