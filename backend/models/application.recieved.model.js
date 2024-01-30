const mongoose = require("mongoose");

const { Schema } = mongoose;

const recievedApplication = new Schema(
  {
    hostelid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hostel"
    },
    studentid:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "student"
    }
    ,
    utrno1:{
      type: String,
      required: true,
    }
    ,
    utrno2:{
      type: String,
      required: true,
    }
    ,
    branch:{
        type:String,
        required:true,
    },
    dateoftransaction:{
        type:Date,
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
