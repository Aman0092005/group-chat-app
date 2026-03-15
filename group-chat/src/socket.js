import {io} from "socket.io-client";

const URL = "https://group-chat-backend-ap6w.onrender.com";
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