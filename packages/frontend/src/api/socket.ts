import {io} from 'socket.io-client';
const URL = "/";

let gameSocketInstance: ReturnType<typeof io> | undefined;
let chatSocketInstance: ReturnType<typeof io> | undefined;

export const gameSocket = ({token, matchId}): ReturnType<typeof io>=> {
    gameSocketInstance =  io(URL, {
        autoConnect: false,
        path: '/gameSocket',
        auth: {
            token: token
        },
        query: {
            matchId: matchId
        }
    })
    return gameSocketInstance;
};



export const chatSocket = ({username, matchId}): ReturnType<typeof io>=> {
    chatSocketInstance =  io(URL, {
        autoConnect: false,
        path: '/chatSocket',
        query: {
            matchId,
            username
        }
    })
    return chatSocketInstance;
};


export const getGameSocketInstance = (): ReturnType<typeof io> | undefined => gameSocketInstance
export const getChatSocketInstance = (): ReturnType<typeof io> | undefined => chatSocketInstance
