const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminAllotted = new Schema(
  {
    hostelid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hostel"
    },
    adminid: {
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

