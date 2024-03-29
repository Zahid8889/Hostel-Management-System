const { asyncHandler } = require("../utils/asynchandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const OpenApplication = require("../models/application.open.model.js"); // Updated the model name to be in line with common naming conventions
const RecievedApplication = require("../models/application.recieved.model.js"); // Updated the model name to be in line with common naming conventions
const Hostel = require("../models/hostel.model.js"); // Import your hostel model
const Admin = require("../models/admin.model.js");
const AdminHostel = require("../models/admin.hostel.model.js");
const RoomAllotted = require("../models/room.occupied.model.js");
const Student = require("../models/student.model.js");
const Transaction = require("../models/transaction.accepted.model.js");

const open_application = asyncHandler(async (req, res) => {
    const adminid = req.admin._id
    const { gender,dept, session,allotmentsession, endDate } = req.body;
    // Check if any required field is empty
    // console.log(gender,dept, session,allotmentsession, endDate )
    if (!gender || !dept || !session || !endDate||!allotmentsession) {
        throw new ApiError(400, "Missing required parameters");
    }

    // Step 1: Find the allotted hostel id from adminhostel schema
    const adminHostel = await AdminHostel.findOne({ adminid });
    if (!adminHostel) {
        throw new ApiError(400, "Hostel not allotted to this admin");
    }

    const { hostelid } = adminHostel;
    const hostel = await Hostel.findById(hostelid)
    if(!hostel) throw new ApiError(400, "Hostel not found");
    // Step 2: Save in open application schema
    const alreadyopened = await OpenApplication.findOne({hostelid,gender,dept, session,allotmentsession})
    if(alreadyopened){
        console.log(alreadyopened)
        throw new ApiError(400,"this application already opened")
    }
    const openApplication = new OpenApplication({
        hostelid,
        hostelno:hostel.hostelno,
        adminid,
        gender,
        dept,
        allotmentsession,
        session,
        endDate
    });
    await openApplication.save();

    res.json(new ApiResponse(200,openApplication,"Application opened successfully" ));
});

const closeapplication = asyncHandler(async(req,res)=>{
    const applicationid = req.body.applicationid
    // Find the application by ID and update 'opened' to false
    const application = await OpenApplication.findByIdAndUpdate(applicationid, { opened: false }, { new: true });
        
    if (!application) {
        throw new ApiError(400 ,"Application not found" );
    }
    
    // If update successful, send the updated application as response
    res.json(new ApiResponse(200, application ,"application closed successfully"));
})

// student get the application form

const fetchApplicationformStudent = asyncHandler(async(req,res)=>{
    const { dept,gender, session } = req.student;
    const allotmentsession = req.body.allotmentsession;
    const studentid = req.student._id;

    // Check if the student has already applied in recievedapplication schema
    const existingApplication = await RecievedApplication.findOne({ studentid, allotmentsession });
    if (existingApplication) {
        res.json(new ApiResponse(400,{isapplied:true,isallotted:false,existingApplication}, "Student has already applied for this session"));
    }

    // Check if the student has room allotted already in roomallotted using studentid and allotment session
    const existingRoomAllotment = await RoomAllotted.findOne({ studentid, allotmentsession });
    if (existingRoomAllotment) {
        res.json(new ApiResponse(400,{isapplied:false,isallotted:true}, "Student already has room allotted for this session"));
    }

    // Fetch from openapplications using all variables
    const openApplications = await OpenApplication.findOne({ dept, gender, session,allotmentsession,opened:true });
    // if (openApplications.length === 0) {
    //     throw new ApiError(404, "No open applications found for this session");
    // }
    // console.log(openApplications)
    res.json(new ApiResponse(200,{isapplied:false,isallotted:false, openApplications },"fetched application successfully"));
})



const addRecievedApplication = asyncHandler(async (req, res) => {
    
    const studentid = req.student._id
    

    const {hostelid,utrno1,utrno2,dept,dateoftransaction,session,allotmentsession} = req.body

    // Check if any field is empty
    if (!utrno1 || !utrno2 || !dept || !dateoftransaction || !session||!allotmentsession) {
        const apiError = new ApiError(400,"All fields must be filled");
        return res.status(apiError.statusCode).json(apiError);
    }

    try {
        const existingTransaction1 = await Transaction.findOne({ utrno: utrno1 });
        const existingTransaction2 = await Transaction.findOne({ utrno: utrno2 });
    
        if (existingTransaction1 || existingTransaction2) {
            throw new ApiError(400, "Transaction UTR already exists");
        }
    
        // Save in received application
        const receivedApplication = new RecievedApplication({
            hostelid,
            studentid,
            utrno1,
            utrno2,
            dept,
            dateoftransaction,
            session,
            allotmentsession
        });
    
        await receivedApplication.save();
    
        res.json(new ApiResponse(200,{}, "Received application added successfully" ));
    } catch (error) {
        // Handle any errors that may occur during the creation process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error);
        } else if (error.name === "ValidationError") {
            // Validation error handling
            const validationErrors = Object.values(error.errors).map((e) => e.message);
            const errorMessage = `Validation Error: ${validationErrors.join(", ")}`;
            const apiError = new ApiError(404,errorMessage);
            
            // console.log(apiError)
            return res.status(apiError.statusCode).json(apiError);
        } else {
            // Generic error handling
            const apiError = new ApiError(501,error.message+"Internal Server Error");
            console.log(apiError.message,'yes')
            return res.status(apiError.statusCode).json(apiError);
        }
    }
});
const fetchRecievedApplication = asyncHandler(async (req, res) => {
    const adminid = req.admin._id
    const { allotmentsession} = req.body;

    // Check if hostelno and session are provided
    if ( !allotmentsession) {
        const apiError = new ApiError(400,"Hostel number and session must be provided");
        return res.status(apiError.statusCode).json(apiError);
    }

    try {
        const adminHostel = await AdminHostel.findOne({ adminid });
        if (!adminHostel) {
            throw new ApiError(400, "Hostel not allotted to this admin");
        }

        const receivedApplications = await RecievedApplication.find({ hostelid:adminHostel.hostelid, allotmentsession ,allotted:false}).populate('studentid');

        // Respond with the fetched data using ApiResponse class
        console.log(receivedApplications)
        const response = new ApiResponse(200, { receivedApplications }, "Received applications fetched successfully");
        // console.log('done')
        return res.status(response.statusCode).json(response);
    } catch (error) {
        // Handle any errors that may occur during the fetch process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error);
        } else {
            // Generic error handling
            const apiError = new ApiError(500,"Internal Server Error");
            return res.status(apiError.statusCode).json(apiError);
        }
    }
});
module.exports = {
    open_application,fetchApplicationformStudent,addRecievedApplication,fetchRecievedApplication,closeapplication
};
