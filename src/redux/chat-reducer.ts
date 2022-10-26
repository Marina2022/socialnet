import {BaseThunkType, InferActions} from "./redux-state";
import {chatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

export type StatusType = 'pending' | 'ready'

const initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState;

export const ChatReducerACs = {
    messagesReceived: (messages: ChatMessageType[]) => (
        {
        type: 'MESSAGES-RECEIVED',
        payload: messages
    } as const),
    statusChanged: ((status:StatusType)=>({
        type: 'STATUS-CHANGED',
        payload: status
    } as const))
}

type ActionsTypes = InferActions<typeof ChatReducerACs>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MESSAGES-RECEIVED":
            return {...state, messages: [...state.messages, ...action.payload]}
        case "STATUS-CHANGED":
            return {...state, status: action.payload}
        default:
            return state;
    }
}

export type ThunkType = BaseThunkType<ActionsTypes>

const messageEventHandlerCreator = (dispatch: Dispatch) => {
    return (messages: ChatMessageType[])=>{
        dispatch(ChatReducerACs.messagesReceived(messages))
    }
}
const openEventHandlerCreator = (dispatch: Dispatch) => {
    return (status: StatusType)=>{
        dispatch(ChatReducerACs.statusChanged(status))
    }
}

export const startListening = (): BaseThunkType<ActionsTypes, void> =>  (dispatch)=> {
  chatAPI.start();
  chatAPI.subscribe("messagesReceived", messageEventHandlerCreator(dispatch))
  chatAPI.subscribe("WsOpened", openEventHandlerCreator(dispatch))
}
export const stopListening = (): BaseThunkType<ActionsTypes, void> =>  (dispatch)=> {
  chatAPI.stop();
    chatAPI.unsubscribe("messagesReceived", messageEventHandlerCreator(dispatch))
    chatAPI.unsubscribe("WsOpened", openEventHandlerCreator(dispatch))
}
///



export const sendMessage = (text: string): BaseThunkType<ActionsTypes, void> => (dispatch)=>{
    chatAPI.sendMessage(text);
}
    export default chatReducer;