import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../common/form-controls/validators";
import {Textarea} from "../common/form-controls/form-contols";

const maxLength20 = maxLengthCreator(20);

const Dialogs = (
  {sendMessage, messages, dialogs, isAuth}
) => {

  const onSendMessage = (props) => {
    sendMessage(props.text);
  }
  const messageElements = messages.map(m => <Message message={m} key={m.id}/>)
  const dialogElements = dialogs.map(dialog =>
    <DialogItem
      name={dialog.name}
      id={dialog.id}
      avatar={dialog.avatar}
      key={dialog.id}/>)


  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div>
        <div className={s.sendMessageBlock}>
          <NewMessageForm onSubmit={onSendMessage}  />
        </div>
        {messageElements}
      </div>
    </div>
  )
}


const Form = (props) => {
  const {handleSubmit} = props;
  return (
    <form action="" onSubmit={handleSubmit} >
    <Field name="text" component={Textarea} validate={[maxLength20, required]}   />
      <button>Publish</button>
    </form>
  )
}


const NewMessageForm = reduxForm({form: "newMessageForm"})(Form)

export default Dialogs;