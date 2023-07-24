const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'M1 Microservice API',
            version: '1.0.0',
            description: 'API документация для приложения',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./app.js'],
};

module.exports = swaggerOptions;
