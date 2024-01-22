const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const roomOccupiedSchema = new Schema(
  {
    hostelno: {
      type:Schema.Types.ObjectId,
      ref: "hostel",
      required:true,
    },
    student:{
      type:Schema.Types.ObjectId,
      ref: "student",
      required:true,
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
