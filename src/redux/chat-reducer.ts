import {BaseThunkType, InferActions} from "./redux-state";
import {chatAPI, ChatMessageType} from "../api/chatAPI";

const initialState = {
    messages: [] as Array<ChatMessageType>,
}

export type InitialStateType = typeof initialState;

export const ChatReducerACs = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'MESSAGES-RECEIVED',
        payload: messages
    } as const),
}

type ActionsTypes = InferActions<typeof ChatReducerACs>

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "MESSAGES-RECEIVED":
            return {...state, messages: [...state.messages, ...action.payload]}
        default:
            return state;
    }
}

export type ThunkType = BaseThunkType<ActionsTypes>

export const startListening = (): BaseThunkType<ActionsTypes, void> =>  (dispatch)=> {
  chatAPI.start();
  chatAPI.subscribe((messages)=>{
    dispatch(ChatReducerACs.messagesReceived(messages))
  })
}

export const sendMessage = (text: string): BaseThunkType<ActionsTypes, void> => (dispatch)=>{
    chatAPI.sendMessage(text);
}
    export default chatReducer;