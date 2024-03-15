const jwt = require('jsonwebtoken')
const Student = require("../models/student.model.js")
const Admin = require("../models/admin.model.js")
const {ApiError} = require("../utils/ApiError.js")
const {asyncHandler} = require("../utils/asynchandler.js")
// const { admin } = require("../models/admin.hostel.model.js");

const verifyJWTstudent = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessTokenStudent || req.header("Authorization")?.replace("Bearer ", "") 
        // console.log(req.header("cookie"));
        // console.log(token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const student = await Student.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!student) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.student = student;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
 const verifyJWTadmin = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessTokenAdmin || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!admin) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
        // console.log(token,'yes');
    
        req.admin = admin;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})
module.exports = {verifyJWTstudent,verifyJWTadmin}
