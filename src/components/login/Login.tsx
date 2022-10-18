import {reduxForm} from "redux-form";
import {authorize} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppDispatch, GlobalStateType} from "../../redux/redux-state";
import LoginForm from "./LoginForm";
import React from "react";


const Login: React.FC = (props) => {
  const isAuth = useSelector((state: GlobalStateType)=>state.auth.isAuth);
  const dispatch: AppDispatch = useDispatch();
  if(isAuth) return <Navigate to={'/profile'} />
  const onSubmit = (formData: any) => {
    dispatch(authorize(formData))
  };
  return <div>
    <h1>
      Log in
    </h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}


const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

export default Login;
