const mongoose = require("mongoose");

const { Schema } = mongoose;

const openApplication = new Schema(
  {
    hostelid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hostel"
    },
    hostelno: {
      type: Number,
  },
    adminid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "admin"
    },
    gender:{
      type:String,
      required:true
    },
    dept:{
        type:String,
        required:true,
    },
    session:{
        type:String,
        required:true,
    },
    allotmentsession:{
      type:String,
        required:true,
    },
    endDate:{
        type:Date,
        required:true
    },
    opened:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('openApplication', openApplication)
