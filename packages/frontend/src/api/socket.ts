import {io} from 'socket.io-client';
const URL = "http://52.23.252.196";

let socketInstance: ReturnType<typeof io> | undefined;

export const socket = ({token, matchId}): ReturnType<typeof io>=> {
    socketInstance =  io(URL, {
        autoConnect: false,
        path: '/gameSocket',
        auth: {
            token: token
        },
        query: {
            matchId: matchId
        }
    })
    return socketInstance;
};

export const getSocketInstance = (): ReturnType<typeof io> | undefined => socketInstance
