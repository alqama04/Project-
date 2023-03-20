const mongoose = require('mongoose')
const validator = require('validator')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "Name should have at least 2 characters"],
        lowercase: true

    },
    mrp: {
        type: Number,
        required: true,
    },

    discount: {
        type: Number,
        required: [true, 'Discount is required']
    },
    discounted_price: {
        type: Number,
        required: [true, 'Discounted price is required']
    },
    category: {
        type: String,
        ref: "Category",
        required: [true, 'Please select category'] // Category model is linked
    },
    sub_category: {
        type: String,
        required: [true, 'Please select sub-category'] // sub Category model is linked
    },
    ingredients:{
        type:String,
    },
    skin_type: { //
        type: String,
        required: true
    },
    net_weight: {//
        type: String,
        required: true
    },

    listings: { //new
        type: [String],
    },
    expiry_date:{ //new
        type:String,
        required:true
    },
    description: {
        type: String,
        required: [true, 'description required']
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
    bulletPoints: {
        type: [String],
    },
    keywords:{
        type:String
    },
    stock: {
        type: Number,
        require: true,
        default: 1
    },

    avgRating: {
        type: String,
        default:'0'

    },
    utilize:{
        type:String,
        required:true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    sold: {
        type: Number,
        default: 0
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

module.exports = mongoose.model("Product", productSchema)
