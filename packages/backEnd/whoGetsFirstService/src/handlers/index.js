const logger = require('../utils/logger');
const {
    getMatch
} = require('../connectors/toMatchService');
const {
    sendEventAndEmitNewState
} = require('../utils');
const {
    gameStates
} = require('../gameState/game.js');

let matches = {};

const onConnection = (io) => {
    return async (socket) => {
        try {
            let playerId = socket.playerId;
            let matchId = socket.handshake.query.matchId;

            logger.info("New playerId: " + playerId + " for matchId: " + matchId);

            await socket.join(matchId);

            let match;
            if (socket.handshake.query.matchId in matches) {
                match = matches[socket.handshake.query.matchId];
            } else {
                match = await getMatch(socket.handshake.query.matchId);

                let state = JSON.parse(JSON.stringify(gameStates.initialState));
                state.context.matchId = socket.handshake.query.matchId;

                match.state = JSON.stringify(state);
                matches[socket.handshake.query.matchId] = match;
            }

            sendEventAndEmitNewState(io, null, matches[matchId]);

            socket.on("READY", () => {
                logger.info("Received event READY for playerId: " + playerId);
                sendEventAndEmitNewState(io, {
                    type: "READY",
                    value: playerId
                }, matches[matchId]);
            });

            socket.on("PLAY", (msg) => {
                logger.info("Received event PLAY for playerId: " + playerId + " with x: " + msg.x + " and y: " + msg.y);
                sendEventAndEmitNewState(io, {
                    type: "PLAY",
                    player: playerId,
                    x: msg.x,
                    y: msg.y
                }, matches[matchId]);
            });

            socket.on("RESET", () => {
                sendEventAndEmitNewState(io, {
                    type: "RESET"
                }, matches[matchId]);
            });

            socket.on("disconnect", () => {
                logger.info("Received event DISCONNECT for playerId: " + playerId);
                sendEventAndEmitNewState(io, {
                    type: "DISCONNECT",
                    value: playerId
                }, matches[matchId]);
            });
        } catch (err) {
            console.log(err);
        }
    }
};

const onConnectionError = (err) => {
    console.log(`connect_error due to ${err.message}`);
};

module.exports = {
    onConnection,
    onConnectionError
};