import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {Navigate} from 'react-router-dom';

const Dialogs = (
  {sendMessage, newMessageChange, messages, dialogs, newMessageText, isAuth}
) => {

  if (isAuth===false) return <Navigate to={'/login'}/>

  const onSendMessage = () => {
    sendMessage();
  }
  const messageElements = messages.map(m => <Message message={m} key={m.id}/>)
  const dialogElements = dialogs.map(dialog =>
    <DialogItem
      name={dialog.name}
      id={dialog.id}
      avatar={dialog.avatar}
      key={dialog.id}/>)

  const onNewMessageChange = (e) => {
    const text = e.target.value;
    newMessageChange(text)
  }
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div>
        <div className={s.sendMessageBlock}>
          <textarea  className={s.textarea} value={newMessageText}
                    onChange={onNewMessageChange}></textarea>
          <button onClick={onSendMessage}>Publish</button>
        </div>
        {messageElements}
      </div>
    </div>
  )
}

export default Dialogs;