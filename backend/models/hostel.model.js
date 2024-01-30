const mongoose = require("mongoose");

const { Schema } = mongoose;

const hostelSchema = new Schema(
  {
    hostelno: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('hostel', hostelSchema)
