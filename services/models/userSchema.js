const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        _id: String,
        userFirstName: {
            type: String,
            required: true
        },
        userLastName: {
            type: String,
            required: true
        },
        userDob: {
            type: String,
            required: true
        },
        userMobileNumber: {
            type:Number,
            required: true
        },
        userEmail: {
            type: String,
            unique : true,
            required: true
        },
        userAddress: {
            type: String,
            required: true
        },userIsAdmin: {
            type: Boolean,
            required: true,
            default:false
        },
        userName: {
            type: String,
            unique : true,
            required: true
        },
        userPassword: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
)
let user = mongoose.model('user', userSchema);

module.exports = user;
