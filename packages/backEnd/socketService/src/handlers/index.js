const { getMatch } = require('../connectors/toMatchService');
const { sendEventAndEmitNewState } = require('../utils');
const { gameStateService } = require('../handlers/game.js');

let matches = {};

const onConnection = async (socket) => {
    try {
        console.log("New connection: " + socket.id);
        
        socket.join(socket.handshake.query.matchId);
    
        console.log("New client connected in room: " + socket.handshake.query.matchId);

        let match;
        if (matches.containsKey(socket.handshake.query.matchId)) {
            match = matches[socket.handshake.query.matchId];
        } else {
            match = await getMatch(socket.handshake.query.matchId);
            matches[socket.handshake.query.matchId] = match;
        }
        console.log(match);

        socket.emit("newState", {
            state: gameStateService.getSnapshot(),
            nextEvents: gameStateService.getSnapshot().machine.states[gameStateService.getSnapshot().value].events
        });
    
        socket.on("READY", (msg) => {
            sendEventAndEmitNewState(io, gameStateService, {
                type: "READY",
                value: msg.player
            }, socket.handshake.query.matchId);
        });

        socket.on("PLAY", (msg) => {
            sendEventAndEmitNewState(io, gameStateService, {
                type: "PLAY",
                player: msg.player,
                value: msg.i
            }, socket.handshake.query.matchId);
        });
    
        socket.on("RESET", () => {
            sendEventAndEmitNewState(io, gameStateService, {
                type: "RESET"
            }, socket.handshake.query.matchId);
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