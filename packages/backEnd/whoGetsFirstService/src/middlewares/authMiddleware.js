const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const verifyToken = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        socket.playerId = decoded.id;
        next();
    } catch (err) {
        logger.error(err.message);
        next(new Error('Authentication error'));
    }
};

module.exports = {
    verifyToken
};