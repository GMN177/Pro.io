const { getMatch } = require('../connectors/toMatchService');
const { sendEventAndEmitNewState } = require('../utils');
const { initialContext, gameStates } = require('../handlers/game.js');

let matches = {};

const onConnection = async (socket) => {
    try {
        console.log("New connection: " + socket.id);

        socket.join(socket.handshake.query.matchId);
    
        console.log("New client connected in room: " + socket.handshake.query.matchId);

        let match;
        if (socket.handshake.query.matchId in matches) {
            console.log('match exists')
            match = matches[socket.handshake.query.matchId];
        } else {
            console.log('match does not exist')
            match = await getMatch(socket.handshake.query.matchId);
            match.context = initialContext;
            matches[socket.handshake.query.matchId] = match;
        }
        
        console.log('matches:', matches);

        /*sendEventAndEmitNewState(socket, gameStates, {
            type: ""
        }, matches[socket.handshake.query.matchId]);*/
    
        socket.on("READY", (msg) => {
            sendEventAndEmitNewState(socket, gameStates, {
                type: "READY",
                value: msg.player
            }, matches[socket.handshake.query.matchId]);
        });

        socket.on("PLAY", (msg) => {
            sendEventAndEmitNewState(socket, gameStates, {
                type: "PLAY",
                player: msg.player,
                value: msg.i
            }, matches[socket.handshake.query.matchId]);
        });
    
        socket.on("RESET", () => {
            sendEventAndEmitNewState(socket, gameStates, {
                type: "RESET"
            }, matches[socket.handshake.query.matchId]);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    } catch (err) {
        console.log(err);
    }
};

const onConnectionError = (err) => {
    console.log(`connect_error due to ${err.message}`);
};

module.exports = {
    onConnection,
    onConnectionError
};