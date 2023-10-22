require('dotenv').config();
const amqp = require('amqplib');
const logger = require('./utils/logger');

const listen = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);

    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
    });

    await channel.assertQueue(process.env.LOGS_QUEUE, {
        durable: false
    });

    channel.consume(
        process.env.LOGS_QUEUE,
        (message) => {
            let log = JSON.parse(message.content.toString());
            let logString = `${log.timestamp} [${log.serviceName}] - ${log.level}: ${log.message}`;
            if (log.level === 'error')
                logger.error(logString);
            else if (log.level === 'warn')
                logger.warn(logString);
            else if (log.level === 'info')
                logger.info(logString);
            else if (log.level === 'verbose')
                logger.verbose(logString);
            else if (log.level === 'debug')
                logger.debug(logString);
            else if (log.level === 'silly')
                logger.silly(logString);
        }, {
            noAck: true
        }
    );
}

listen()
    .then(() => logger.info('LOG AGGREGATOR SERVICE UP AND RUNNING'))
    .catch((err) => logger.error(err));