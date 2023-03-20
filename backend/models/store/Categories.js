const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },

    img: [
        {
            public_id: {
                type: String,
                required: true,
            }, url: {
                type: String,
                required: true,
            },
        }
    ],
    subCategory: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
                lowercase: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true, // User model linked 
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Category", categorySchema)