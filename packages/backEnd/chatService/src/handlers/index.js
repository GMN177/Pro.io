const logger = require('../utils/logger');
const onConnection = (io) => {
    return async (socket) => {
        try {
            let username = socket.handshake.query.username;
            let matchId = socket.handshake.query.matchId;

            logger.info("New username: " + username + " for matchId: " + matchId);

            await socket.join(matchId);

            socket.to(matchId).emit("NEW_MESSAGE", {
                sender: username,
                message: username + ' has joined the chat.'
            });

            socket.on("MESSAGE", (message) => {
                logger.info("Received event MESSAGE for username: " + username + " with value: " + message);
                io.to(matchId).emit("NEW_MESSAGE", {
                    sender: username,
                    message: message
                });
            });


            socket.on("disconnect", () => {
                logger.info("Received event DISCONNECT for username: " + username);
                socket.to(matchId).emit("NEW_MESSAGE", {
                    sender: username,
                    message: username + ' has left the chat.'
                });
            });
        } catch (err) {
            logger.error(err.message);
        }
    }
};

const onConnectionError = (err) => {
    logger.error(`connect_error due to ${err.message}`);
};

module.exports = {
    onConnection,
    onConnectionError
};