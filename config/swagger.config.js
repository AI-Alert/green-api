const swaggerOptions = require("../utils/docs/options.swagger");
swaggerConfig = { ...swaggerOptions, apis: ['./app.js', './utils/docs/annotations.swagger.js'] }
module.exports = swaggerConfig
