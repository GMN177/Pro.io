require('dotenv').config();
const socketio = require('socket.io');
const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan.middleware");
const {
    onConnection,
    onConnectionError
} = require('./handlers');

const port = process.env.SERVER_PORT || 4000;

const io = socketio(port, {
    path: '/chatSocket',
    rejectUnauthorized: false,
    cors: {
        origin: '*',
    }
});

io.engine.use(morganMiddleware);

io.on("connection", onConnection(io));

io.on("connect_error", onConnectionError);

logger.info(`SYSTEM UP AND RUNNING ON PORT ${port}!`);