import {StatusType} from "../redux/chat-reducer";

export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

let ws: WebSocket | null = null

const closeWsHandler = () => {
    setTimeout(createChannel, 3000);
};

const openWsHandler = () => {
    subscribers.WsOpened.forEach(cb=>{
        cb('ready');
    })
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.messagesReceived.forEach(callback => callback(newMessages));
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openWsHandler);
}

const createChannel = () => {
    cleanUp();
    ws?.close();
    subscribers.WsOpened.forEach(cb=>{
        cb('pending');
    })
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeWsHandler);
    ws.addEventListener('open', openWsHandler);
    ws?.addEventListener('message', messageHandler);
}

let subscribers: {
    messagesReceived: Array<(messages: ChatMessageType[])=>void>
    WsOpened: Array<(status: StatusType)=>void>
} = {messagesReceived: [], WsOpened: []}


type SubscribeType = 'messagesReceived' | 'WsOpened'

export const chatAPI =
    {
        subscribe(type: SubscribeType, callback: (messages: any)=> void) {
            // @ts-ignore
            subscribers[type].push(callback);
        },
        unsubscribe(type: SubscribeType, callback: ((messages: any)=> void)) {
            // @ts-ignore
            subscribers[type] = subscribers[type].filter((item)=> item === callback);
        },

        start() {
            createChannel()
        },

        stop() {
            cleanUp()
            ws?.close()

        },

        sendMessage(text: string) {
            ws?.send(text)
        }

}

