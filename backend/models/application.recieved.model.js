const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const recievedApplication = new Schema(
  {
    hostelno: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hostel"
    },
    branch:{
        type:String,
        required:true,
    },
    session:{
        type:String,
        required:true,
    },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('recievedApplication', recievedApplication)
