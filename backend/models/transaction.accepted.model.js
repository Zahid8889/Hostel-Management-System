const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const transactionAcceptedSchema = new Schema(
  {
    student:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"student"
    },
    UTR_no: {
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
    category:{
        type:String,
        trim:true,
        enum:["hostel","electricity"],
        required:true
    },
    accountno:{
        type:Number,
        required: true
    },
    accountName:{
        type:String,
        trim:true,
        required:true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('transactionAccepted', transactionAcceptedSchema)
