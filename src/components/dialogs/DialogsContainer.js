import s from "./dialogs.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";
import {addMessageActionCreator, newMessageTextChangeActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = ({store}) => {

  const sendMessage = () => {
    store.dispatch(addMessageActionCreator())
  }

  const {messages, dialogs, newMessageText} = store.getState().dialogsPage;

  // const messageElements = messages.map(m => <Message message={m} key={m.id}/>)
  // const dialogElements = dialogs.map(dialog =>
  //   <DialogItem
  //     name={dialog.name}
  //     id={dialog.id}
  //     avatar={dialog.avatar}
  //     key={dialog.id}/>)

  const newMessageChange = (text) => {
    store.dispatch(newMessageTextChangeActionCreator(text));
  }

  return (
   <Dialogs
     sendMessage={sendMessage}
     newMessageChange={newMessageChange}
     messages={messages}
     dialogs={dialogs}
     newMessageText={newMessageText}/>
  )
}

export default DialogsContainer;