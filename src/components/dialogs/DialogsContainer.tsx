import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from 'redux'
import {MessageType} from "../../types/types";
import {DialogType} from "../../types/types";
import {GlobalStateType} from "../../redux/redux-state";

const mapStateToProps = (state: GlobalStateType)=>({
  messages: state.dialogsPage.messages,
  dialogs: state.dialogsPage.dialogs,
  newMessageText: state.dialogsPage.newMessageText,
  isAuth: state.auth.isAuth
})


export type DialogMapStateProps = {
  messages: Array<MessageType>
  dialogs: Array<DialogType>
  newMessageText: string
  isAuth: boolean
}

export type DialogDispatchProps = {
  sendMessage: (text: string) => void
}

// const mapDispatchToProps = (dispatch) => ({
//   sendMessage: (text) => dispatch(addMessageActionCreator(text)),
// })

const ComposedDialogsContainer = compose(connect(mapStateToProps, {sendMessage: addMessageActionCreator}),
  // withAuth
)(Dialogs)

// const DialogsContainer = (connect(mapStateToProps, mapDispatchToProps)(withAuth(Dialogs)));
// export default DialogsContainer;
export default ComposedDialogsContainer;