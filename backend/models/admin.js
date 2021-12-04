const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },
  
  Password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
