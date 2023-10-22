const Transport = require('winston-transport');
const amqp = require('amqplib');

class AMQPTransport extends Transport {
	constructor(options = {}) {
		super(options);
	}

	log(data, callback) {
		send(data)
			.then(_data => {
				this.emit('logged', _data)
				callback(undefined, 'logged')
			})
			.catch(error => {
				this.emit('error', error)
				callback(error)
			});
	}
}

async function send(data) {
	let connection;
	let error;

	try {
		connection = await amqp.connect(process.env.RABBITMQ_URI);

		const channel = await connection.createChannel();

		await channel.assertQueue(process.env.LOGS_QUEUE, {
			durable: false
		});

		channel.sendToQueue(process.env.LOGS_QUEUE, Buffer.from(data));

		await channel.close();
	} catch (error_) {
		error = error_;
	} finally {
		if (connection) await connection.close();
	}

	if (error) {
		throw error;
	}

	return data;
}

module.exports = AMQPTransport;