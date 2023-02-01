const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    _id: String,
    createdBy: {
        type: String,
        require: true
    },
    busNumber: {
        type: String,
        require: true,
    },
    from: {
        type: String,
        require: true
    },
    to: {   
        type: String,
        require: true
    },
    travelDate: {
        type: String,
        require: true
    },
    seats: {
        type: Array,
        require: true
    },
    pickupTime: {
        type: String,
        require: true,
    },
    dropTime: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})
let bus = mongoose.model('busDetails', busSchema);

module.exports = bus;
