import styles from './login.module.css'
import {Field, reduxForm} from "redux-form";
import {authorize} from "../../redux/auth-reducer";
import {connect} from "react-redux";



const Login = (props) => {

  const onSubmit = (formData) => {
    props.authorize(formData)
  };
  return <div>
    <h1>
      Log in
    </h1>
    <LoginReduxForm onSubmit={onSubmit} />
  </div>
}

const LoginForm = (props) =>(
  <form action="" onSubmit={props.handleSubmit}>
    <div><Field name="email" type="text" placeholder="email"  className={styles.inp} component="input"/></div>
    <div><Field name="password" type="text" placeholder="password" className={styles.inp} component="input"/></div>
    <div><Field name="rememberMe" type="checkbox" className={styles.inp} component="input"/></div>
    <div><button>Log in</button></div>
  </form>
)

const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const mapStateToProps = () => ({

})

export default connect(mapStateToProps, {authorize})(Login);
//export default Login