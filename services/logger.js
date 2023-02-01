const winston = require('winston');
const logConfig = {
    'transports':[
        new winston.transports.Console()
    ]
};
const logger = winston.createLogger(logConfig);
module.exports = logger;