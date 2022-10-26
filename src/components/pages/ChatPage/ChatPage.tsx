import React, {useEffect, useMemo, useRef, useState} from "react";
import {AppDispatch, GlobalStateType} from "../../../redux/redux-state";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startListening, StatusType, stopListening} from "../../../redux/chat-reducer";

type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

const ChatPage: React.FC = () => {
    return (
        <Chat/>
    )
}
const Chat: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
       useEffect(() => {
           dispatch(startListening());
           return ()=>{
               dispatch(stopListening());
           }
    }, [])

    return (
        <div>
            <ChatMessages />
            <AddChatMessageForm />
        </div>
    )
}

const ChatMessages: React.FC = () => {

    const messages = useSelector((state: GlobalStateType)=> state.chatPage.messages)
    useEffect(()=>{
        setTimeout(()=>{
            bottom.current?.scrollIntoView({behavior: 'smooth' })
        }, 300)

    }, [messages])
    const bottom = useRef<HTMLDivElement>(null);

    return (
        <div style={{
            height: 400,
            border: 'dotted 1px aqua',
            marginBottom: 10,
            borderRadius: 1,
            padding: 20,
            overflow: 'auto'
        }}>
            {messages.map((item: ChatMessageType, index: number) => <Message message={item} key={index}/>)}
        <div ref={bottom}></div>

        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType | null }> = React.memo(({message}) => {
    console.log("I'm message")
    return (
        <div>
            <div><img src={message?.photo} alt={"ava"} style={{width: 30}}/> {message?.userName}: {message?.message}
            </div>
        </div>
    )
})


const AddChatMessageForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [text, setText] = useState('');  // textarea text
    const OnSendMessage = () => {
        setText('')
        dispatch(sendMessage(text));
    }
    const statusFromReducer = useSelector((state: GlobalStateType)=>state.chatPage.status)
    const [connectionStatus, setConnectionStatus] = useState<StatusType>()


    useEffect(()=>{
        setConnectionStatus(statusFromReducer)
    }, [statusFromReducer])

    return (
        <div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.target.value)} name="ChatMessageText"></textarea>
            </div>
            <div>
                <button disabled={connectionStatus==='pending'} onClick={OnSendMessage}
                        style={{marginTop: 10}}>  Send
                </button>
            </div>

        </div>
    )
}

export default ChatPage