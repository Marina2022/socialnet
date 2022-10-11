import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../common/form-controls/validators";
import {Textarea} from "../common/form-controls/form-contols";
import {DialogDispatchProps, DialogMapStateProps} from "./DialogsContainer";
import React from "react";

const maxLength20 = maxLengthCreator(20);

type PropsType = DialogMapStateProps & DialogDispatchProps
type DialogFormNamesType = {
  text: string
}

const Dialogs: React.FC<PropsType> = (
  {sendMessage, messages, dialogs}
) => {
  const onSubmit = (formData: DialogFormNamesType) => {
    sendMessage(formData.text);
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
          <NewMessageForm onSubmit={onSubmit}  />
        </div>
        {messageElements}
      </div>
    </div>
  )
}

const Form: React.FC<InjectedFormProps<DialogFormNamesType>> = (props) => {
  const {handleSubmit} = props;
  return (
    <form action="" onSubmit={handleSubmit} >
    <Field name="text" component={Textarea} validate={[maxLength20, required]}   />
      <button>Publish</button>
    </form>
  )
}

const NewMessageForm = reduxForm<DialogFormNamesType>({form: "newMessageForm"})(Form)

export default Dialogs;