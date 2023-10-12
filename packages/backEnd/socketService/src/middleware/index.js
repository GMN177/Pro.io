const jwt = require('jsonwebtoken')

const verifyToken = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        console.log('token: ', token);

        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log('decoded: ', decoded);

        socket.playerId = decoded.id;
        next();
    } catch (err) {
        console.log(err);
        next(new Error('Authentication error'));
    }
};

module.exports = {
    verifyToken
};