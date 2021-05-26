const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Order", orderSchema);
