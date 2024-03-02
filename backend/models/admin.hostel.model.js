const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminAllotted = new Schema(
  {
    hostelid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "hostel",
      unique:true
    },
    adminid: {
      type: Schema.Types.ObjectId,
      required: true,
      unique:true,
      ref: "admin"
    }
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('adminAllotted', adminAllotted)

