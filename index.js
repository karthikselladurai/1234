const logger = require('./services/logger');
const server = require('./services/index')
let port = process.env.PORT | 4040
const sms = require('./services/notification/twilio')

server.listen(port, () => {
    logger.info(`Server: Service center listening on port ${port}!`);
});

// sms.sendSms