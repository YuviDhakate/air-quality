import { APP } from '../config/app.config';
let webSocket;

export const initiateSocket = () => {
    webSocket = new WebSocket(APP.SOCKET_SERVER_URL);
};

export const subscribe = (cb) => {
    if (!webSocket) {
        initiateSocket();
    }

    webSocket.onmessage = (event) => {
        return cb(null, JSON.parse(event.data));
    };
};