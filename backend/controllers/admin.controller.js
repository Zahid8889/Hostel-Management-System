const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const Admin = require("../models/admin.model.js")
const RoomsAllotted = require("../models/room.occupied.model.js")
const Hostel = require("../models/hostel.model.js")
const AdminHostel = require("../models/admin.hostel.model.js")
const { ApiResponse } = require("../utils/ApiResponse.js")
const jwt  =require("jsonwebtoken")
const mongoose = require("mongoose");


const generateAccessAndRefereshTokens = async(adminId) =>{
    try {
        const admin = await Admin.findById(adminId)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registeradmin = asyncHandler( async (req, res) => {
    // get admin details from frontend
    // validation - not empty
    // check if admin already exists: name, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create admin object - create entry in db
    // remove password and refresh token field from response
    // check for admin creation
    // return res


    const {name, email, phonumber, password ,employeeno,rollnum,dept,fathername,gender,dob} = req.body
    //console.log("email: ", email);

    if (
        [ employeeno, name, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    const existedadmin =    await Admin.findOne({
        employeeno:employeeno 
    })

    if (existedadmin) {
        throw new ApiError(409, "admin with email or name already exists")
    }
    
   

    const admin = await Admin.create({
        name, email, phonumber, password ,employeeno,rollnum,dept,fathername,gender,dob
    })

    const createdadmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    )

    if (!createdadmin) {
        throw new ApiError(500, "Something went wrong while registering the admin")
    }

    return res.status(201).json(
        new ApiResponse(200, createdadmin, "admin registered Successfully")
    )

} )

const loginadmin = asyncHandler(async (req, res) =>{
    // req body -> data
    // name or email
    //find the admin
    //password check
    //access and referesh token
    //send cookie

    const {email, employeeno, password} = req.body
    // console.log(email);

    if (!employeeno && !email) {
        throw new ApiError(400, "name or email is required")
    }

    const admin = await Admin.findOne({
        $or: [{employeeno}, {email}]
    })

    if (!admin) {
        throw new ApiError(404, "admin does not exist")
    }

   const isPasswordValid = await admin.isPasswordCorrect(password)
   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid admin credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(admin._id)

    const loggedInadmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessTokenAdmin", accessToken, options)
    .cookie("refreshTokenAdmin", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                admin: loggedInadmin, accessToken, refreshToken
            },
            "admin logged In Successfully"
        )
    )

})

const logoutadmin = asyncHandler(async(req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessTokenAdmin", options)
    .clearCookie("refreshTokenAdmin", options)
    .json(new ApiResponse(200, {}, "admin logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshTokenadmin || req.body.refreshTokenAdmin

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const admin = await Admin.findById(decodedToken?._id)
    
        if (!admin) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(admin._id)
    
        return res
        .status(200)
        .cookie("accessTokenAdmin", accessToken, options)
        .cookie("refreshTokenAdmin", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {"accessTokenAdmin":accessToken, refreshTokenAdmin: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const admin = await Admin.findById(req.admin?._id)
    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    admin.password = newPassword
    await admin.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentadmin = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {currentAdmin:req.admin},
        "admin fetched successfully"
    ))
})

const getstudents = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    try {
        // Check if email is provided
        if (!email) {
            throw new ApiError(400, "Email must be provided");
        }

        // Fetch admin based on the provided email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        // Fetch adminHostel based on admin id
        const adminHostel = await AdminHostel.findOne({ adminid: admin._id });
        if (!adminHostel) {
            console.log("j")
            throw new ApiError(404, "Admin's hostel not found");
        }

        // Fetch students in the hostel based on adminHostel
        const students = await RoomsAllotted.find({ hostelid: adminHostel.hostelid }).populate("studentid");

        // Respond with the fetched students data using ApiResponse class
        const response = new ApiResponse(200, { students }, "Students fetched successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        // Handle any errors that may occur during the fetch process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error);
        } else {
            // Generic error handling
            const apiError = new ApiError(500, "Internal Server Error");
            console.log(error)
            return res.status(apiError.statusCode).json(apiError);
        }
    }
})

const gethostel = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
    // Step 1: Find the hostelId allotted to the admin from AdminAllotted db using admin id
    const adminAllotted = await AdminHostel.findOne({ adminid });
    if (!adminAllotted) {
        throw new ApiError(400, "Hostel not allotted to this admin");
    }

    const { hostelid } = adminAllotted;

    // Step 2: Find and return the hostel from hostel db using hostelId
    const hostel = await Hostel.findById(hostelid);
    if (!hostel) {
        // throw new ApiError(400, "Hostel not found");
        res.json(new ApiResponse(200,{isallotted : false},"No hostel allotted"));
    }
    else
        res.json(new ApiResponse(200,{isallotted : true, hostel},"returned allotted hostel"));
})
module.exports = {
    registeradmin,
    loginadmin,
    logoutadmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentadmin,
    getstudents,
    gethostel
}