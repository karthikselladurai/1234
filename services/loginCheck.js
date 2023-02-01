const jwt = require('jsonwebtoken');
const moment = require('moment');
const logger = require('./logger')

//check token
exports.checkUserToken =  async function  (req, res, next) {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` Check User Token process start ...` })
    var token = req.get('Authorization');
    if (token) {
        token = token.slice(7);
         await jwt.verify(token, process.env.SECRET+"false", (err, decoded) => {
            console.log(process.env.SECRET+"false");
            if (err) {
                logger.error({ status: "unsuccess", message: "access denied", data: {} })
                return  res.send({ status: "unsuccess", message: "access denied", data: {} })
            } else {
                logger.info({ status: "success", message: "access granted", data: {} })
                next()
            }
        });
    } else {
        return  res.send({ status: "unsuccess", message: "Token can't be null", data: {} })
    }
}
exports.checkAdminToken =  async function  (req, res, next) {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: `Check Admin Token process start ...` })
    var token = req.get('Authorization');
    if (token) {
        token = token.slice(7);
         await jwt.verify(token, process.env.SECRET+"true", (err, decoded) => {
            if (err) {
                logger.error({ status: "unsuccess", message: "access denied", data: {} })
                return res.send({ status: "unsuccess", message: "access denied", data: {} })
            } else {
                logger.info({ status: "success", message: "access granted", data: {} })
                next()
            }
        });
    } else {
        return  res.send({ status: "unsuccess", message: "Token can't be null", data: {} })
    }
}