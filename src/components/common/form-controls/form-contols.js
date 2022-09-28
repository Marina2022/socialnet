import sInp from "../../login/login.module.css"
import s from "../../dialogs/dialogs.module.css"

export const Textarea = ({input, meta, ...props}) => {
  return (
    <div>
      <div>
        <textarea {...input} {...props} className={s.textarea + ' ' + (meta.error && meta.touched ? s.error : '')}/>
      </div>
      {meta.error && meta.touched ? <div className={s.errorSpan}>{meta.error}</div> : ''}
    </div>
  )
}

export const Input = ({input, meta, ...props}) => {
  return (
    <div>
      <div>
        <input {...input} {...props} className={sInp.inp + ' ' + (meta.error && meta.touched ? s.error : '')}/>
      </div>
      {meta.error && meta.touched ? <div className={s.errorSpan}>{meta.error}</div> : ''}
    </div>
  )
}