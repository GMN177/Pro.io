const winston = require('winston');
const AMQPTransport = require('./AMQPTransport');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:SS'
    }),
    winston.format.colorize({
        all: true
    }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

const amqpFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:SS'
    })
);

const transports = [
    new winston.transports.Console({
        format: consoleFormat
    }),
    new AMQPTransport({
        serviceName: 'whoGetsFirstService',
        format: amqpFormat
    })
];

const logger = winston.createLogger({
    level: level(),
    levels,
    transports
});

module.exports = logger;