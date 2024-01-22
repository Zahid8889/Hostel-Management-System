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
    },
    total_rooms: {
      type: Number,
      required: true,
    }
    ,
    student_per_room: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('adminallotted', adminAllotted)

