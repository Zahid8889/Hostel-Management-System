const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomOccupiedSchema = new Schema(
  {
    hostelid: {
      type:Schema.Types.ObjectId,
      ref: "hostel",
      required:true,
    },
    roomid: {
      type:Schema.Types.ObjectId,
      ref: "room",
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
    allotmentsession:{
      type:String,
        required:true,
    },
    utrno1:{
      type:String,
      ref: "transaction",
      required:true,
    },
    utrno2:{
      type:String,
      ref: "transaction",
      required:true,
    },
    applicationid:{
      type:Schema.Types.ObjectId,
      ref:"recievedApplication",
      required:true,
      unique:true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('roomOccupied',roomOccupiedSchema)
