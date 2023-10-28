const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token == undefined) {
        logger.error("UNAUTHORIZED");
        return res.sendStatus(401);
    } 
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            logger.error("FORBIDDEN");
            return res.sendStatus(403);
        }
        req.body.tokenData = data;
        logger.info("ACCESS GRANTED");
        next();
    })
}

module.exports = {
    authenticateToken
}