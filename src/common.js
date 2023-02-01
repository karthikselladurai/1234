const jwt = require('../services/loginCheck');
const createUser = require('./createUser/createUser');
const common = require('../services/loginCheck');
const cbs = require('./admin/busService/busService');
const bookTk = require('./user/bookBusTicket/booking');
const smsService = require('./../services/notification/twilio')

//users
const userUpdate = [
    common.checkUserToken,
    createUser.updateUser
]
const userBookTk = [
    common.checkUserToken,
    bookTk.booking
]
//admin
const adminCbs = [
    // common.checkAdminToken,
    cbs.createBusService
]
const adminUbs = [
    // common.checkAdminToken,
    cbs.updateBusService
]
const adminRbd = [
    // common.checkAdminToken,
    // smsService.sendSms,
    cbs.readBusService
    // smsService.sendSms

]
const adminDbs = [
    // common.checkAdminToken,
    cbs.deleteBusService
]


module.exports = {
    //users
    userUpdate,
    userBookTk,

    //admin
    adminCbs,
    adminUbs,
    adminRbd,
    adminDbs
}



