import {io} from 'socket.io-client';
import {baseURL} from './axiosConfig';

let ticTacToeSocketInstance: ReturnType<typeof io> | undefined;
let whoGetsFirstSocketInstance: ReturnType<typeof io> | undefined;
let chatSocketInstance: ReturnType<typeof io> | undefined;

export const ticTacToeSocket = ({token, matchId}): ReturnType<typeof io>=> {
    ticTacToeSocketInstance =  io(baseURL, {
        autoConnect: false,
        path: '/ticTacToeSocket',
        auth: {
            token: token
        },
        query: {
            matchId: matchId
        }
    })
    return ticTacToeSocketInstance;
};

export const whoGetsFirstSocket = ({token, matchId}): ReturnType<typeof io>=> {
    whoGetsFirstSocketInstance =  io(baseURL, {
        autoConnect: false,
        path: '/whoGetsFirstSocket',
        auth: {
            token: token
        },
        query: {
            matchId: matchId
        }
    })
    return whoGetsFirstSocketInstance;
};



export const chatSocket = ({username, matchId}): ReturnType<typeof io>=> {
    chatSocketInstance =  io(baseURL, {
        autoConnect: false,
        path: '/chatSocket',
        query: {
            matchId,
            username
        }
    })
    return chatSocketInstance;
};


export const getTicTacToeSocketInstance = (): ReturnType<typeof io> | undefined => ticTacToeSocketInstance
export const getWhoGetsFirstSocketInstance = (): ReturnType<typeof io> | undefined => whoGetsFirstSocketInstance
export const getChatSocketInstance = (): ReturnType<typeof io> | undefined => chatSocketInstance
