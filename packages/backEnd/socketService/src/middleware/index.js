const verifyToken = (socket, next) => {
    const token = socket.handshake.query.token;
    console.log(socket.handshake)
    console.log(socket.handshake.query)
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(new Error('Authentication error'));
        }
        socket.playerId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken
};