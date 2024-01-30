const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const adminAllotted = new Schema(
  {
    hostelno: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hostel"
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "admin"
    }
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('adminallotted', adminAllotted)

