import {io} from "socket.io-client";

const URL = "http://172.20.10.7:3000";
let socket;

export const createSocket = (user) => {
    socket = io(URL,{
        auth: {
            userId: user.userId,
            email: user.email
        }
    });
    return socket;
}


// after creating socket we can directly use this method by importing
export const getSocket = () => socket;