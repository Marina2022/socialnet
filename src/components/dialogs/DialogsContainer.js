import {addMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from 'redux'

const mapStateToProps = (state)=>({
  messages: state.dialogsPage.messages,
  dialogs: state.dialogsPage.dialogs,
  newMessageText: state.dialogsPage.newMessageText,
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (text)=> dispatch(addMessageActionCreator(text)),
})

const ComposedDialogsContainer = compose(connect(mapStateToProps, mapDispatchToProps),
  // withAuth
)(Dialogs)

// const DialogsContainer = (connect(mapStateToProps, mapDispatchToProps)(withAuth(Dialogs)));
// export default DialogsContainer;
export default ComposedDialogsContainer;