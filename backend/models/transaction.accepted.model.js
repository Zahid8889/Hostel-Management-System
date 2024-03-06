const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const transactionAcceptedSchema = new Schema(
  {
    studentid:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"student"
    },
    utrno: {
        type: String,
        trim:true,
        required: true,
        unique:true,
        index:true
    },
    amount:{
        type: Number,
        required:true
    },
    // accountno:{
    //     type:Number,
    //     required: true
    // },
    // accountName:{
    //     type:String,
    //     trim:true,
    //     required:true
    // }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('transactionAccepted', transactionAcceptedSchema)
