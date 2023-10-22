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

    await channel.consume(
        process.env.LOGS_QUEUE,
        (message) => {
            logger.log(message.content.toString());
        }, {
            noAck: true
        }
    );
}

listen()
    .then(() => logger.info('LOG AGGREGATOR SERVICE UP AND RUNNING'))
    .catch((err) => logger.error(err));