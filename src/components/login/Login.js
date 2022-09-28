import styles from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {authorize} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {Input} from "../common/form-controls/form-contols";
import {maxLengthCreator, required} from "../common/form-controls/validators";
import {Navigate} from "react-router-dom";


const Login = (props) => {
  console.log('зашел в логин')
  if(props.isAuth) return <Navigate to={'/profile'} />
  //if(props.isAuth) window.history.back()

  const onSubmit = (formData) => {
    props.authorize(formData)
  };
  return <div>
    <h1>
      Log in
    </h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
}

const maxLength20 = maxLengthCreator(20);

const LoginForm = (props) => {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <div><Field name="email" type="text" validate={[required, maxLength20]} placeholder="email" className={styles.inp}
                  component={Input}/></div>
      <div><Field name="password" type="text" placeholder="password" className={styles.inp} component="input"/></div>
      <div><Field name="rememberMe" type="checkbox" className={styles.inp} component="input"/></div>
      {props.error && <div>{props.error}</div> }
      <div>
        <button>Log in</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const mapStateToProps = (state)=> ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {authorize})(Login);
//export default Login