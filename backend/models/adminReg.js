const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonumber: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  hostelno: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("admin", adminSchema);
