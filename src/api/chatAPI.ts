export type ChatMessageType = {
    userId: number
    userName: string
    message: string
    photo: string
}

let ws: WebSocket | null = null

const createChannel = () => {
    ws?.removeEventListener('close', closeWsHandler);
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeWsHandler)
}

const closeWsHandler = () => {
    createChannel();
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    callbacks.forEach(callback => callback(newMessages));
};

const callbacks: Array<(messages: ChatMessageType[])=>void> = [];

export const chatAPI =
    {
        subscribe(callback: ((messages: ChatMessageType[])=> void)) {
            callbacks.push(callback);
        },

        start() {
            createChannel()
            ws?.addEventListener('message', messageHandler)
        },

        sendMessage(text: string) {
            ws?.send(text)
        }

}

