const amqp = require('amqplib');
const pino = require('pino');
const sortArray = require('./functions/sort.function');
const { EventEmitter } = require('events');

const queue = 'tasks';
const logger = pino();
const eventEmitter = new EventEmitter();

// Асинхронная функция для обработки входящей таски - сортировка входящего массива
const processTask = async (task, msg) => {
    try {
        const unsortedArray = task;

        logger.info('Received unsorted array:', unsortedArray);

        const sortedArray = sortArray(unsortedArray);

        logger.info('Sorted array:', sortedArray);

        const result = { result: sortedArray };

        eventEmitter.emit('taskProcessed', result, msg);
    } catch (e) {
        logger.error('Error processing task.', e);
        const result = { error: 'Error processing task.' };

        eventEmitter.emit('taskProcessed', result, msg)
    }
};

// Добавление listener на событие taskProcessed - Отправка очереди и закрытие соединение с RabbitMQ
eventEmitter.on('taskProcessed', async (result, msg) => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(result)),
            {
                correlationId: msg.properties.correlationId,
            }
        );

        await channel.close();
        await connection.close();

        logger.info('Connection to RabbitMQ closed.');
    } catch (e) {
        logger.error('Error closing connection to RabbitMQ:', e)
    }
});

// Подключение к RabbitMQ, вывод сообщения из очереди и вызов функции-обработчика processTask()
(async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: true });

        await channel.consume(queue, async (msg) => {
            const task = JSON.parse(msg.content.toString());
            logger.info('Received task:', task);

            await processTask(task, msg)
        })
    } catch (e) {
        logger.error('Error connecting to RabbitMQ:', e)
    }
})();
