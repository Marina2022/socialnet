import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {createRef} from "react";

const Dialogs = ({state}) => {
  const sendMessage = () => {
    alert(messageText.current.value);
  }
  const messageText = createRef();
  const {messages, dialogs} = state;
  const messageElements = messages.map(m => <Message message={m} key={m.id}/>)
  const dialogElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar}
                                                           key={dialog.id}/>)
  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>
        {dialogElements}
      </div>
      <div>
        <div className={s.sendMessageBlock}>
        <textarea ref={messageText} className={s.textarea}></textarea>
          <button onClick={sendMessage}>Publish</button>
        </div>

        {messageElements}
      </div>
    </div>
  )
}

export default Dialogs;