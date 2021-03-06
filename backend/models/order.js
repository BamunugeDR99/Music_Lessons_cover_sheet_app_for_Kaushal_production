const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  CoverIDs: [
    {
      type: String,
      required: true,
    },
  ],

  CustomerID: {
    type: String,
    required: true,
  },

  TotalPrice: {
    type: String,
    required: true,
  },

  TransactionDateAndTime: {
    type: Date,
    required: true,
    default: new Date().toLocaleString('en-US', {timeZone : 'Asia/Colombo'}),
  },

  ReferenceNo: {
    type: String,
    required: true,
    default: "0000",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
