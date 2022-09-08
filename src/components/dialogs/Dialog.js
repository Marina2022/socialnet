import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {createRef} from "react";

const Dialogs = ({state, newMessageTextChange, rerender}) => {
  const sendMessage = () => {
    newMessageTextChange('', rerender);
  }

  const messageText = createRef();
  const {messages, dialogs, newMessageText} = state;
  const messageElements = messages.map(m => <Message message={m} key={m.id}/>)
  const dialogElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}
                                                           key={dialog.id}/>)

  const onNewMessageChange = () => {
    const text = messageText.current.value;
    newMessageTextChange(text, rerender);
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div>
        <div className={s.sendMessageBlock}>
        <textarea ref={messageText} className={s.textarea} value={newMessageText} onChange={onNewMessageChange}></textarea>
          <button onClick={sendMessage}>Publish</button>
        </div>

        {messageElements}
      </div>
    </div>
  )
}

export default Dialogs;