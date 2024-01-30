const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomOccupiedSchema = new Schema(
  {
    hostelno: {
      type:Schema.Types.ObjectId,
      ref: "hostel",
      required:true,
    },
    studentid:{
      type:Schema.Types.ObjectId,
      ref: "student",
      required:true,
    },
    session:{
      type: String,
      required: true
    }
    ,
    transaction:{
      type:Schema.Types.ObjectId,
      ref: "transaction",
      required:true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('roomOccupied',roomOccupiedSchema)
