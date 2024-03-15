const mongoose = require("mongoose");

const { Schema } = mongoose;

const noticeSchema = new Schema(
  {
    adminid:{
        type:Schema.Types.ObjectId,
        ref:'admin',
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
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('notice', noticeSchema)
