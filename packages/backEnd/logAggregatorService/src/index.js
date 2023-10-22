const amqp = require('amqplib');
const logger = require('./utils/logger');

try {
    const connection = await amqp.connect("amqp://rabbitmq");

    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
    });

    await channel.assertQueue("logs", {
        durable: false
    });

    await channel.consume(
        queue,
        (message) => {
            logger.log(message.content.toString());
        }, {
            noAck: true
        }
    );
} catch (err) {
    console.log(err);
}