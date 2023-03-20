const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true, // User model linked 
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Brand", brandSchema)