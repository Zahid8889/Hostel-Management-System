const mongoose = require("mongoose");

const { Schema } = mongoose;

const complaintSchema = new Schema(
  {
    studentid:{
        type:Schema.Types.ObjectId,
        ref:'student',
        required:true
    },
    hostelid:{
        type:Schema.Types.ObjectId,
        ref:'hostel',
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    message:{
        type:String,
        required:true
    },
    resolved:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('complaint', complaintSchema)
