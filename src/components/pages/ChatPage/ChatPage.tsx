import {useEffect, useState} from "react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        const closeWsHandler = ()=>{
            createChannel();
        };
        const createChannel = () => {
            wsChannel?.removeEventListener('close', closeWsHandler);
            wsChannel?.close();
            const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeWsHandler)
            setWsChannel(ws);
        }
        createChannel();
        return ()=> {
            wsChannel?.removeEventListener('close', closeWsHandler)
            wsChannel?.close();
        }

    }, [])

    return (
        <div>
            <ChatMessages wsChannel={wsChannel}/>
            <AddChatMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const ChatMessages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((messages) => [...messages, ...newMessages]);
        };
        wsChannel?.addEventListener('message', messageHandler)
        return ()=> {

        }
    }, [wsChannel])

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
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType | null }> = ({message}) => {
    return (
        <div>
            <div><img src={message?.photo} alt={"ava"} style={{width: 30}}/> {message?.userName}: {message?.message}
            </div>
        </div>
    )
}

const AddChatMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [text, setText] = useState('');
    const [wsStatus, setWsStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const setStatus = () => {
            setWsStatus('ready');
        };
        wsChannel?.addEventListener('open', setStatus)
        return ()=>{
            wsChannel?.removeEventListener('open', setStatus)
        }

    }, [wsChannel])

    const SendMessage = () => {
        wsChannel?.send(text);
        setText('')
    }

    return (
        <div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.target.value)} name="ChatMessageText"></textarea>
            </div>
            <div>
                <button disabled={wsChannel == null || wsStatus === 'pending'} onClick={SendMessage}
                        style={{marginTop: 10}}> {wsStatus} Send
                </button>
            </div>
        </div>
    )
}

export default ChatPage