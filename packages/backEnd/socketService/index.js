require('dotenv').config()
const socketio = require('socket.io');
const logger = require('./src/middlewares/logMiddleware')
const { verifyToken } = require('./src/middleware/authMiddleware');
const { onConnection, onConnectionError } = require('./src/handlers');


const io = socketio(process.env.SERVER_PORT || 4000, {
    path: '/gameSocket',
    rejectUnauthorized: false,
    cors: {
        origin: '*',
    }
});

io.engine.use(logger);

io.use(verifyToken);

io.on("connection", onConnection(io));

io.on("connect_error", onConnectionError);