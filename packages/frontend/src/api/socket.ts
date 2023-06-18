import {io} from 'socket.io-client';
const URL = "https://34.201.46.6";

export const socket = ({token, matchId}): ReturnType<typeof io>=> {
    return io(URL, {
        autoConnect: false,
        path: '/gameSocket',
        auth: {
            token: token
        },
        query: {
            matchId: matchId
        }
    })};
