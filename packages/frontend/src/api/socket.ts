import {io} from 'socket.io-client';
const URL = "http://34.201.46.6/gameSocket";

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
