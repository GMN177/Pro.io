const Transport = require('winston-transport');
const amqp = require('amqplib');

class AMQPTransport extends Transport {
	constructor(options = {}) {
		super(options);
		this.serviceName = options.serviceName;
	}

	log(data, callback) {
		this.send(data)
			.then(_data => {
				this.emit('logged', _data)
				callback(undefined, 'logged')
			})
			.catch(error => {
				this.emit('error', error)
				callback(error)
			});
	}

	async send(data) {
		let connection;
		let error;
	
		try {
			connection = await amqp.connect(process.env.RABBITMQ_URI);
	
			const channel = await connection.createChannel();
	
			await channel.assertQueue(process.env.LOGS_QUEUE, {
				durable: false
			});
	
			let message = JSON.stringify({
				serviceName: this.serviceName,
				message: data.message,
				level: data.level,
				timestamp: data.timestamp
			});
	
			channel.sendToQueue(process.env.LOGS_QUEUE, Buffer.from(message));
	
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
}



module.exports = AMQPTransport;