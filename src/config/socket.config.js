import {io , Socket} from 'socket.io-client';

let socket ;

export const getSocket = () =>{
    if(!socket){
        socket = io('http://localhost:3004' , {autoConnect : false});
    }
    return socket;
}

export const connectSocket = () => {
    const socket = getSocket();
    if (!socket.connected) {
        socket.connect();
    }
};

export const disconnectSocket = () => {
    const socket = getSocket();
    if (socket.connected) {
        socket.disconnect();
    }
};