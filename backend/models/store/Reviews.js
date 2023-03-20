const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true, 'product Id is required in order to add reviews']
    },
    rating: {
        type: Number,
        required: true
    },
    review_title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required:true
    },
    recommend: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
}

)


module.exports = mongoose.model("Review", reviewSchema)