const mongoose = require("mongoose");
const { Schema } = mongoose;

const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Student = new Schema(
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
    studentImage: {
      type: String, // url
      // required: true,
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
    session: {
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

Student.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10)
  next()
})


Student.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password, this.password)
}


Student.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          regnumber: this.regnumber
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
Student.methods.generateRefreshToken = function(){
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
module.exports = mongoose.model("student", Student);
