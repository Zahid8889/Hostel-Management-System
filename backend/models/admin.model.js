const mongoose = require("mongoose");

const { Schema } = mongoose;
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const adminSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phonumber: {
      type: Number,
      required: true,
      unique: true,
    },
    fathername: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
adminSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10)
  next()
})


adminSchema.methods.isPasswordCorrect = async function(password){
  return await bcryptjs.compare(password, this.password)
}


adminSchema.methods.generateAccessToken = function(){
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
adminSchema.methods.generateRefreshToken = function(){
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
module.exports = mongoose.model("admin", adminSchema);
