const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JwtCustomerSchema = new Schema({


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

const JwtCustomer = mongoose.model("JWTCustomer", JwtCustomerSchema);
module.exports = JwtCustomer;
