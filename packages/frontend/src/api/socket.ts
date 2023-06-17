import {io} from 'socket.io-client';
const URL = "http://44.212.4.133/gameSocket";

export const socket = ({token, matchId}): ReturnType<typeof io>=> {
    return io(URL, {
    autoConnect: false,
    auth: {
        token: token
    },
    query: {
        matchId: matchId
    }
  })};
