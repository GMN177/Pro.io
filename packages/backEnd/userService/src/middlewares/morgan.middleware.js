const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
    write: (message) => logger.http(message.trim())
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

morgan.token('request-body', (req, res) => JSON.stringify(req.body));

const morganMiddleware = morgan(
    ":method :url :status - :response-time ms - :request-body", {
        stream,
        skip
    }
);

module.exports = morganMiddleware;