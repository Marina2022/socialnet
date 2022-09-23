import {addMessageActionCreator, newMessageTextChangeActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuth from "../HOCs/authHOC";

// const mapStateToProps2 = (state)=>({
//   isAuth: state.auth.isAuth
// })


const mapStateToProps = (state)=>({
  messages: state.dialogsPage.messages,
  dialogs: state.dialogsPage.dialogs,
  newMessageText: state.dialogsPage.newMessageText,
  isAuth: state.auth.isAuth
})


const mapDispatchToProps = (dispatch) => ({
  sendMessage: ()=> dispatch(addMessageActionCreator()),
  newMessageChange: (text)=> dispatch(newMessageTextChangeActionCreator(text)),
})


const DialogsContainer = (connect(mapStateToProps, mapDispatchToProps)(withAuth(Dialogs)));

export default DialogsContainer;