const logger = require('../../services/logger');
const userSchema = require('../../services/models/userSchema');
const env = process.env
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authCheck = async (req) => {
    try {
        let body = req.body
        let resp = await userSchema.find({ userName: body.userName })
        console.log(env.SECRET);
        // let respId = resp[0]._id.toString()
        if (resp.length > 0) {
            let password_valid = await bcrypt.compare(body.userPassword, resp[0].userPassword);
            if (password_valid) {
                console.log(env.SECRET+`"${resp[0].userIsAdmin}"`);
                let token = jwt.sign({ id: resp[0]._id.toString() }, env.SECRET+`${resp[0].userIsAdmin}`, { expiresIn: "10h" });
                console.log(token);
                resp[0].userPassword = ''
                logger.info({ status: "success", message: "Login Successfully", data: resp[0]._id })
                return { status: "success", message: "Login Successfully", data: resp, token: token }
            }
            logger.info({ status: "Unsuccess", message: "Incorrect password", data: {} })
            return { status: "Unsuccess", message: "Incorrect password", data: {} }
        }
        logger.info({ status: "unsuccess", message: "No User Found", data: {} })
        return { status: "unsuccess", message: "No User Found", data: {} }
    } catch (err) {
        logger.error({ status: "unsuccess", message: "AuthCheck api failed", data: err })
    }
}