const mongoose = require("mongoose");
const { Schema } = mongoose;

const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const studentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    phonumber: {
      type: Number,
      unique: true,
      trim: true, 
      required:[true, 'Password is required']
    },
    regnumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true, 
      lowercase: true,
      index: true
    },
    rollnum: {
      type: Number,
      trim: true, 
      required: true
    },
    dept: {
      type: String,
      trim: true, 
      required: true
    },
    fathername: {
      type: String,
      trim: true, 
      required: true
    },
    gender: {
      type: String,
      
      required: true
    },
    dob: {
      type: Date,
      required: true,
      
    },
    refreshToken: {
      type: String
  }
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10)
  next()
})


studentSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password, this.password)
}


studentSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}
module.exports = mongoose.model("student", studentSchema);
