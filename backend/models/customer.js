const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  ContactNumber: {
    type: String,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  Country: {
    type: String,
    required: true,
  },

  Username: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },

  FeedBackIDs: [
    {
      type: String,
      required: true,
      default: null,
    },
  ],

  OrderIDs: [
    {
      type: String,
      required: true,
      default: null,
    },
  ],

  LoginStatus: {
    type: Boolean,
    required: true,
    default: false,
  },

  DeleteStatus: {
    type: Boolean,
    required: true,
    default: false,
  },

  UpdatedDateAndTime: {
    type: Date,
    required: false,
    default: null,
  },

  RegisteredDateAndTime: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

//hashing password
customerSchema.pre("save", async function (next) {
  // console.log("hi")

  if (this.isModified("password")) {
    var salt = bcrypt.genSaltSync(12);
    this.password = bcrypt.hashSync(this.password, salt);
    // this.confirmPassword = bcrypt.hashSync(this.confirmPassword, salt);
  }

  next();
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
