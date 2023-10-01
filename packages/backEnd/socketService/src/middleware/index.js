const verifyToken = (socket, next) => {
    const token = socket.handshake.query.token;
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(new Error('Authentication error'));
        }
        //socket.decodedToken = decoded;
        socket.playerId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken
};