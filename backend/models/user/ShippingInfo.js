const mongoose = require('mongoose')
const validator = require('validator')

const shippingInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    customerPhoneNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
        lowercase: true,
    },
    address: {
        type: String,
        required: true,
        minLength: [10, "address should be 10 characters long"],
        maxLength: [50, 'address can not be more then 100 characters.']

    },
    locality: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'India',
    },
    pinCode: {
        type: Number,
        required: true,
    },
    addressType: {
        type: String,
        required: true
    }


}, { timestamps: true, })

module.exports = mongoose.model('ShippinInfo', shippingInfoSchema)