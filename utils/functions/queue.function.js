const amqp = require('amqplib');
const pino = require('pino');

const logger = pino();
const closeRabbitMQConnection = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.close();
        await connection.close();

        logger.info('Connection to RabbitMQ closed.');
    } catch (e) {
        logger.error('Error closing connection to RabbitMQ:', e)
    }
};

module.exports = closeRabbitMQConnection;
