import {io} from 'socket.io-client';
const URL = "http://52.23.252.196";

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
