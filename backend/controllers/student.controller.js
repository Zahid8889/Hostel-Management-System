const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const Student = require("../models/student.model.js")
const { ApiResponse } = require("../utils/ApiResponse.js")
const jwt  =require("jsonwebtoken")
const mongoose = require("mongoose");
const {uploadOnCloudinary} = require("../utils/cloudinary.js")


const generateAccessAndRefereshTokens = async(studentId) =>{
    try {
        const student = await Student.findById(studentId)
        const accessToken = student.generateAccessToken()
        const refreshToken = student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerstudent = asyncHandler( async (req, res) => {
    // get student details from frontend
    // validation - not empty
    // check if student already exists: name, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create student object - create entry in db
    // remove password and refresh token field from response
    // check for student creation
    // return res


    const {name, email, phonumber, password ,regnumber,rollnum,session,dept,fathername,gender,dob} = req.body
    //console.log("email: ", email);

    if (
        [ regnumber, name, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    const existedstudent =    await Student.findOne({
        regnumber:regnumber 
    })

    if (existedstudent) {
        throw new ApiError(409, "student with email or name already exists")
    }
    // console.log(req.files);

    
    const studentImageLocalPath = req.files?.studentImage[0]?.path;
    if (!studentImageLocalPath) {
        throw new ApiError(400, "simage file is required")
    }

    const studentImage = await uploadOnCloudinary(avatarLocalPath)
    
   

    const student = await Student.create({
        name, email, phonumber, password ,regnumber,rollnum,dept,session,fathername,gender,dob,studentImage:studentImage.url
    })

    const createdstudent = await Student.findById(student._id).select(
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
    // name or email
    //find the student
    //password check
    //access and referesh token
    //send cookie

    const {email, regnumber, password} = req.body
    console.log(email);

    if (!regnumber && !email) {
        throw new ApiError(400, "name or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(name || email)) {
    //     throw new ApiError(400, "regnumber or email is required")
        
    // }

    const student = await Student.findOne({
        $or: [{regnumber}, {email}]
    })

    if (!student) {
        throw new ApiError(404, "student does not exist")
    }

   const isPasswordValid = await student.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid student credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(student._id)

    const loggedInstudent = await Student.findById(student._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessTokenStudent", accessToken, options)
    .cookie("refreshTokenStudent", refreshToken, options)
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
    console.log(req.student)
    await Student.findByIdAndUpdate(
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
    .clearCookie("accessTokenStudent", options)
    .clearCookie("refreshTokenStudent", options)
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
    
        const student = await Student.findById(decodedToken?._id)
    
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
        .cookie("accessTokenStudent", accessToken, options)
        .cookie("refreshTokenStudent", newRefreshToken, options)
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

    

    const student = await Student.findById(req.student?._id)
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

// const getCurrentstudent = asyncHandler(async(req, res) => {
//     return res
//     .status(200)
//     .json(new ApiResponse(
//         200,
//         req.student,
//         "student fetched successfully"
//     ))
// })
const getCurrentstudent = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {currentStudent:req.student},
        "student fetched successfully"
    ))
    // const {email} = req.body
    // if (!email) {
    //     const apiError = new ApiError(404,"Email must be provided");
    //     return res.status(apiError.statusCode).json(apiError);
    // }

    // try {
    //     // Fetch admin based on the provided email
    //     const currentStudent = await Student.findOne({ email });

    //     // Check if admin is found
    //     if (!currentStudent) {
    //         throw new ApiError(404,"Student not found");
    //     }

    //     // Respond with the fetched admin data using ApiResponse class
    //     const response = new ApiResponse(200, { currentStudent}, "Student fetched successfully");
    //     // console.log(response)
    //     res.status(response.statusCode).json(response);
    // } catch (error) {
    //     // Handle any errors that may occur during the fetch process
    //     if (error instanceof ApiError) {
    //         return res.status(error.statusCode).json(error);
    //     } else {
    //         // Generic error handling
    //         const apiError = new ApiError(500,"Internal Server Error");
    //         return res.status(apiError.statusCode).json(apiError);
    //     }
    // }
})

module.exports = {
    registerstudent,
    loginstudent,
    logoutstudent,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentstudent
}