import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js"
import { student} from "../models/student.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(studentId) =>{
    try {
        const student = await student.findById(studentId)
        const accessToken = student.generateAccessToken()
        const refreshToken = student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerstudent = asyncHandler( async (req, res) => {
    // get student details from frontend
    // validation - not empty
    // check if student already exists: studentname, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create student object - create entry in db
    // remove password and refresh token field from response
    // check for student creation
    // return res


    const {fullName, email, studentname, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, studentname, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedstudent = await student.findOne({
        $or: [{ studentname }, { email }]
    })

    if (existedstudent) {
        throw new ApiError(409, "student with email or studentname already exists")
    }
    //console.log(req.files);

    
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    
   

    const student = await student.create({
        fullName,
        email, 
        password,
        studentname: studentname.toLowerCase()
    })

    const createdstudent = await student.findById(student._id).select(
        "-password -refreshToken"
    )

    if (!createdstudent) {
        throw new ApiError(500, "Something went wrong while registering the student")
    }

    return res.status(201).json(
        new ApiResponse(200, createdstudent, "student registered Successfully")
    )

} )

const loginstudent = asyncHandler(async (req, res) =>{
    // req body -> data
    // studentname or email
    //find the student
    //password check
    //access and referesh token
    //send cookie

    const {email, studentname, password} = req.body
    console.log(email);

    if (!studentname && !email) {
        throw new ApiError(400, "studentname or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(studentname || email)) {
    //     throw new ApiError(400, "studentname or email is required")
        
    // }

    const student = await student.findOne({
        $or: [{studentname}, {email}]
    })

    if (!student) {
        throw new ApiError(404, "student does not exist")
    }

   const isPasswordValid = await student.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid student credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(student._id)

    const loggedInstudent = await student.findById(student._id).select("-password -refreshToken")

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
                student: loggedInstudent, accessToken, refreshToken
            },
            "student logged In Successfully"
        )
    )

})

const logoutstudent = asyncHandler(async(req, res) => {
    await student.findByIdAndUpdate(
        req.student._id,
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
    .json(new ApiResponse(200, {}, "student logged Out"))
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
    
        const student = await student.findById(decodedToken?._id)
    
        if (!student) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== student?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(student._id)
    
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

    

    const student = await student.findById(req.student?._id)
    const isPasswordCorrect = await student.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    student.password = newPassword
    await student.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentstudent = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.student,
        "student fetched successfully"
    ))
})

export {
    registerstudent,
    loginstudent,
    logoutstudent,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentstudent
}