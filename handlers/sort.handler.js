const amqp = require("amqplib");
const pino = require('pino');

const closeRabbitMQConnection = require('../utils/functions/queue.function');
const isValidNumericArray = require('../utils/validate/array');

const logger = pino();
const queue = 'tasks';
 const handleSortRequest = async (req, res) => {
    try {
        const data = req.body;
        const unsortedArray = data.numbers;

        if (!isValidNumericArray(unsortedArray)) {
            return res.status(400).json({ error: 'Invalid input. Array should contain only numbers.' });
        }

        logger.info('Received unsortedArray:', unsortedArray)

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(unsortedArray)), {
            persistent: true,
            replyTo: 'results',
            correlationId: Date.now().toString(),
        });

        res.status(202).json({ message: 'Task processing started...' });

        await closeRabbitMQConnection();
    } catch (e) {
        logger.error('Error processing task.', e);
        res.status(500).json({ message: 'Error processing task.'});
    }
}

module.exports = handleSortRequest;
