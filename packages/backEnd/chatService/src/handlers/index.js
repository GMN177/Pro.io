const onConnection = (io) => {
    return async (socket) => {
        try {
            let username = socket.handshake.query.username;
            let matchId = socket.handshake.query.matchId;

            console.log("New connection: " + socket.id);
            console.log('username:', username);
            console.log('matchId:', matchId);

            await socket.join(matchId);

            socket.to(matchId).emit("NEW_MESSAGE", {
                sender: username,
                message: username + ' has joined the chat.'
            });

            socket.on("MESSAGE", (message) => {
                io.to(matchId).emit("NEW_MESSAGE", {
                    sender: username,
                    message: message
                });
            });


            socket.on("disconnect", () => {
                socket.to(matchId).emit("NEW_MESSAGE", {
                    sender: username,
                    message: username + ' has left the chat.'
                });
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