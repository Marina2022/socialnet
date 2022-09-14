import {addMessageActionCreator, newMessageTextChangeActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

// import StoreContext from "../../storeContext";

// const DialogsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {
//         (store)=>{
//
//           const sendMessage = () => {
//             store.dispatch(addMessageActionCreator())
//           }
//
//           const {messages, dialogs, newMessageText} = store.getState().dialogsPage;
//           const newMessageChange = (text) => {
//             store.dispatch(newMessageTextChangeActionCreator(text));
//           }
//           return (
//             <Dialogs
//               sendMessage={sendMessage}
//               newMessageChange={newMessageChange}
//               messages={messages}
//               dialogs={dialogs}
//               newMessageText={newMessageText}/>
//           )
//         }
//       }
//     </StoreContext.Consumer>
//   )
// }

const mapStateToProps = (state)=>({
  messages: state.dialogsPage.messages,
  dialogs: state.dialogsPage.dialogs,
  newMessageText: state.dialogsPage.newMessageText,
})

const mapDispatchToProps = (dispatch) => ({
  sendMessage: ()=> dispatch(addMessageActionCreator()),
  newMessageChange: (text)=> dispatch(newMessageTextChangeActionCreator(text)),
})

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;