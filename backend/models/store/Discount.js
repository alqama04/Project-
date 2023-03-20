const mongoose = require("mongoose");

// admin or manager
let discountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    maxAmount: {
        type: Number,
        default: 1999,
        required: [true, 'enter max amount ']
    },
    deliveryCharge: {
        type: Number,
        default: 40,
        required: [true, 'enter delivery charge']
    }

}, {
    timestamps: true,
}
)


module.exports = mongoose.model("Discount", discountSchema)

