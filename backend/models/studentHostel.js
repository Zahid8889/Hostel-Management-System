const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentHostel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonumber: {
    type: Number,
    required: true,
  },
  regnumber: {
    type: Number,
    required: true,
  },
  rollnum: {
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
  mothername: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  roomno: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
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

module.exports = mongoose.model("studentHostel", StudentHostel);
