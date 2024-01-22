const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const openApplication = new Schema(
  {
    hostelno: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "hostel"
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "admin"
    },
    branch:{
        type:String,
        required:true,
    },
    session:{
        type:String,
        required:true,
    },
    endDate:{
        type:Date,
        required:true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('openApplication', openApplication)
