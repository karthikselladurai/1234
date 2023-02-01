const logger = require('../../../services/logger');
const createBusSchema = require('../../../services/models/busSchema');
const { default: mongoose } = require('mongoose');
const moment = require('moment')


exports.createBusService = async (req, res) => {
    try {
        let body = req.body
        console.log(body.travelDate);
        let busData = new createBusSchema({
            createdBy:body.createdBy,
            busNumber: body.busNumber,
            from: body.from,
            to: body.to,
            travelDate: body.travelDate,
            seats: createSeats(),
            pickupTime: body.pickupTime,
            dropTime: body.dropTime
        })
        busData["_id"] = mongoose.Types.ObjectId().toString();
        let validationError = busData.validateSync();
        if (validationError) {
            console.log("...................", validationError);
            logger.error({ status: "unsuccess", message: validationError, data: {} })
            return { status: "unsuccess", message: "invalid parameters", data: {} }
        }
        // console.log(validationError);
        return await busData.save().then(data => {
            logger.info({ status: "success", message: "Bus service created Register Successfully", data: data })
            return { status: "success", message: "Bus service created Successfully", data: data }
        }).catch(err => {
            console.log(err);
            if (err.code === 11000) {
                return { status: "unsuccess", message: "bus Name Already exit", data: {} }
            }
            logger.error({ status: "unsuccess", message: "create bus service failed", data: err })
            return { status: "unsuccess", message: "create bus service failed", data: err }
        })
    } catch (err) {
        console.log(err);
        logger.error({ status: "unsuccess", message: "Create Bus  Api Failed", data: err })
        return { status: "unsuccess", message: "Create Bus  Api Failed", data: err }
    }
}
exports.updateBusService = async (req, res) => {
    try {
        let body = req.body
        let resp = await createBusSchema.findByIdAndUpdate(body._Id, {
            adminId: body.adminId,
            busNumber: body.busNumber,
            from: body.from,
            to: body.to,
            travelDate: body.travelDate,
            seats: createSeats(),
            pickupTime: body.pickupTime,
            dropTime: body.dropTime
        })
        console.log(resp);
        if (resp === null) {
            logger.error({ status: "unsuccess", message: "Bus Service Not Found", data: {} })
            return { status: "unsuccess", message: "Bus Service Not Found", data: {} }
        } else {
            logger.info({ status: "success", message: "Bus Service Updated Successfully", data: {} })
            return { status: "success", message: "Bus Service Updated Successfully", data: {} }
        }
    } catch (err) {
        logger.error({ status: "unsuccess", message: "Update Bus Api failed", data: err })
        return { status: "unsuccess", message: "Update Bus Api failed", data: err }
    }
}
exports.readBusService = async (req, res) => {
    try {
        let resp = await createBusSchema.find();
        console.log(moment().format('MM:DD:YY:HH:mm:ss'));
        resp.forEach(data => {
            // console.log("yes>>>>>>>>>>>>>>>>>>>>>>>>>>>",data.travelDate+data.pickupTime);
            if(data.travelDate+data.pickupTime <= moment().format('MM:DD:YY:HH:mm:ss')){
                console.log("yes>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            }
            let bookedSeatCount = 0
            data.seats.forEach(seat => {
                if (seat.isBooked) {
                    bookedSeatCount++
                }
            })
            // console.log(bookedSeatCount);
            data['bookedSeats'] = bookedSeatCount;
            data['seats'] = 41;
            console.log(data);
            
            // data = {...data, bookedSeats:bookedSeatCount}
        })
        // console.log(resp);
        logger.info({ status: "success", message: "Bus Service Read Successfully", data: {} })
        return { status: "success", message: "Bus Service Read Successfully", data: resp }

    } catch (err) {
        console.log(err);
        logger.error({ status: "unsuccess", message: "Read Bus Api failed", data: err })
        return { status: "unsuccess", message: "Read Bus Api failed", data: err }
    }
}
exports.deleteBusService = async (req, res) => {
    try {
        let body = req.body
        let resp = await createBusSchema.deleteOne({ busNumber: body.busNumber })
        console.log(resp);
        if (resp.deletedCount === 0) {
            logger.error({ status: "unsuccess", message: " Bus Service Not Found", data: {} })
            return { status: "unsuccess", message: "Bus Service Not Found", data: {} }
        } else {
            logger.info({ status: "success", message: " Delete Bus Service Successfully", data: resp })
            return { status: "success", message: " Delete Bus Service  Successfully", data: [] }
        }
    } catch (err) {
        logger.error({ status: "unsuccess", message: "Delete Bus Api failed", data: err })
        return { status: "unsuccess", message: "Delete Bus Api failed", data: err }
    }
}
function createSeats() {
    seats = [];
    for (let i = 0; i < 41; i++) {
        let data = {
            seatId: i,
            isBooked: false,
            userId: null
        }
        seats.push(data)
    }
    // console.log(seats);
    return seats
}