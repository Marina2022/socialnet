import {Field} from "redux-form";
import {maxLengthCreator, required} from "../common/form-controls/validators";
import styles from "./login.module.css";
import {Input} from "../common/form-controls/form-contols";
import React from "react";


const maxLength20 = maxLengthCreator(20);

type PropsType ={
  handleSubmit: (formData: any)=>void
  error: string
}


const LoginForm: React.FC<PropsType> = (props) => {
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
export default LoginForm