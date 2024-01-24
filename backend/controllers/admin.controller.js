const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const Admin = require("../models/admin.model.js")
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
    // //console.log(req.files);

    
    // //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    
   

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
    console.log(email);

    if (!employeeno && !email) {
        throw new ApiError(400, "name or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(name || email)) {
    //     throw new ApiError(400, "employeeno or email is required")
        
    // }

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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "admin logged Out"))
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

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
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
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
        req.admin,
        "admin fetched successfully"
    ))
})

module.exports = {
    registeradmin,
    loginadmin,
    logoutadmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentadmin
}