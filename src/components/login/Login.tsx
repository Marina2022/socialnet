import {reduxForm} from "redux-form";
import {authorize} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {GlobalStateType} from "../../redux/redux-state";
import LoginForm from "./LoginForm";
import React from "react";

type DispatchToPropsType ={
  authorize: (formData:any)=>void
}

type MapToPropsType ={
  isAuth: boolean
}

type OwnProps = {}
type PropsType = MapToPropsType & DispatchToPropsType


const Login: React.FC<PropsType> = (props:PropsType) => {
  if(props.isAuth) return <Navigate to={'/profile'} />
  const onSubmit = (formData: any) => {
    props.authorize(formData)
  };
  return <div>
    <h1>
      Log in
    </h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}


const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const mapStateToProps = (state: GlobalStateType)=> ({
  isAuth: state.auth.isAuth
})

export default connect<MapToPropsType, DispatchToPropsType, OwnProps, GlobalStateType>(mapStateToProps, {authorize})(Login);
