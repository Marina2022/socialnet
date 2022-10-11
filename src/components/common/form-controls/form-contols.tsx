import sInp from "../../login/login.module.css"
import s from "../../dialogs/dialogs.module.css"
import {WrappedFieldProps} from "redux-form/lib/Field";

export const Textarea = ({input, meta, ...props}:WrappedFieldProps) => {
  return (
    <div>
      <div>
        <textarea {...input} {...props} className={s.textarea + ' ' + (meta.error && meta.touched ? s.error : '')}/>
      </div>
      {meta.error && meta.touched ? <div className={s.errorSpan}>{meta.error}</div> : ''}
    </div>
  )
}

export const Input = ({input, meta, ...props}: WrappedFieldProps) => {
  return (
    <div>
      <div>
        <input {...input} {...props} className={sInp.inp + ' ' + (meta.error && meta.touched ? s.error : '')}/>
      </div>
      {meta.error && meta.touched ? <div className={s.errorSpan}>{meta.error}</div> : ''}
    </div>
  )
}