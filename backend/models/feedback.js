const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  Comment: {
    type: String,
    required: true,
  },

  CustomerID: {
    type: String,
    required: true,
  },

  CoverID: {
    type: String,
    required: true,
  },

  UpdatedDateAndTime: {
    type: Date,
    required: false,
    default: null,
  },

  AddedDateAndTime: {
    type: String,
    required: true,
    default: new Date().toLocaleString('en-US', {timeZone : 'Asia/Colombo'}),
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
