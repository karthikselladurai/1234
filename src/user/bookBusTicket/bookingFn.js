const logger = require('../../../services/logger');
const busSchema = require('../../../services/models/busSchema')


exports.update = async (req, res) => {
    try {
        let body = req.body
        let updateSeatId = body.seatId
        console.log(body.busNumber, body.seatId, body.userId);
        // let resp = await busSchema.updateOne({ busNumber: body.busNumber, "seats.seatId": [{ $in: updateSeatId }] }, { $set: { "seats.$.isBooked": "true", "seats.$.userId": body.userId } }, { multi: true });
        let result = await busSchema.find({ busNumber: body.busNumber });
        result[0].seats.map(data => {
            // console.log(data.seatId);
            updateSeatId.forEach(id => {
                if (data.seatId == id) {
                    if (body.booking) {
                        data["isBooked"] = true
                        data["userId"] = body.userId
                    } else {
                        data["isBooked"] = false
                        data["userId"] = null
                    }
                }
            })
        })
        let resp = await busSchema.updateOne({ busNumber: body.busNumber }, { seats: result[0].seats })
        if (resp.acknowledged && resp.modifiedCount === 1) {
            logger.info({ status: "success", message: body.booking?"Seat Booked successfully":"Seat Cancelled successfully", data: {} })
            return { status: "success", message: body.booking?"Seat Booked successfully":"Seat Cancelled successfully", data: {} }
        } else {
            logger.info({ status: "Unsuccess", message: "seat Updated failed", data: {} })
            return { status: "unsuccess", message: "seat Updated failed", data: {} }
        }
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", resp.seats);
    } catch (err) {
        console.log(err);
    }
}