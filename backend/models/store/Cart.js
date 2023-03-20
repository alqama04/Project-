const mongoose = require("mongoose");

let cartSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'Quantity can not be less then 1.'],
    max: [30, 'Quantity can not be more then 10.']
  },

  price: {
    type: Number,
    default: 0,
    required: true
  }

}
)



module.exports = mongoose.model("Cart", cartSchema);