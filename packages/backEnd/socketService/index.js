require('dotenv').config()
const socketio = require('socket.io');
const { verifyToken } = require('./src/middleware');
const { onConnection, onConnectionError } = require('./src/handlers');


const io = socketio(process.env.SERVER_PORT || 4000, {
    path: '/gameSocket',
    rejectUnauthorized: false,
    cors: {
        origin: '*',
    }
});

io.use(verifyToken);

io.on("connection", onConnection(io));

io.on("connect_error", onConnectionError);