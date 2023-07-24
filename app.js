const express = require('express');
const pino = require('pino');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerConfig = require('./config/swagger.config');
const handleSortRequest = require('./handlers/sort.handler');

const app = express();
const logger = pino();

app.use(express.json());

const PORT = 3000;

const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/sort', handleSortRequest);

app.listen(PORT, () => {
    logger.info(`Microservice M1 is running on port ${PORT}`);
});
