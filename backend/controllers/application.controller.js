const { asyncHandler } = require("../utils/asynchandler.js");
const { ApiError } = require("../utils/ApiError.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const OpenApplication = require("../models/application.open.model.js"); // Updated the model name to be in line with common naming conventions
const RecievedApplication = require("../models/application.recieved.model.js"); // Updated the model name to be in line with common naming conventions
const Hostel = require("../models/hostel.model.js"); // Import your hostel model
const Admin = require("../models/admin.model.js");
const Student = require("../models/student.model.js");

const open_application = asyncHandler(async (req, res) => {
    // Assuming you're receiving data through the request body. Adjust accordingly.
    const { hostelno, adminemail, branch, session, endDate } = req.body;

    if (!hostelno || !adminemail || !branch || !session || !endDate) {
        // const apiError = new ApiError(400,"All fields must be filled");
        // console.log(apiError)
        throw new ApiError(400,"All fields must be filled");
        // return res.status(apiError.statusCode).json(apiError);
    }
    
    try {
        const hostel = await Hostel.findOne({ hostelno: hostelno });
        if (!hostel) {
            throw new ApiError(404,"Hostel not found");
            // throw new ApiError("Hostel not found", 404);
        }

        // Convert admin to adminId
        const adminUser = await Admin.findOne({ email: adminemail });
        if (!adminUser) {
            throw new ApiError("Admin not found", 404);
        }

        // Create a new open application entry with converted ids
        const newOpenApplication = new OpenApplication({
            hostelid: hostel._id,
            adminid: adminUser._id,
            branch,
            session,
            endDate,
        });

        // Save the new open application to the database
        await newOpenApplication.save();

        // Respond with a success message or any other relevant data
        const response = new ApiResponse(200,newOpenApplication,"Open application created successfully");
        res.status(201).json(response);
    } catch (error) {
        // Handle any errors that may occur during the creation process
        if (error.name === "ValidationError") {
            // Validation error handling
            const validationErrors = Object.values(error.errors).map((e) => e.message);
            const errorMessage = `Validation Error: ${validationErrors.join(", ")}`;
            const apiError = new ApiError(400,errorMessage);
            return res.status(apiError.statusCode).json(apiError);
        } else {
            // Generic error handling
            // const apiError = new ApiError(500,"Internal Server Error");
            // return res.status(apiError.statusCode).json(apiError);
            throw new ApiError(500,error.message)
        }
    }
});

const fetchApplicationform = asyncHandler(async(req,res)=>{
    const { branch, session } = req.student;
    console.log(branch,session)
    // Check if branch and session are provided
    if (!branch || !session) {
        const apiError = new ApiError(400,"Branch and session must be provided");
        return res.status(apiError.statusCode).json(apiError);
    }

    try {
        // Fetch open applications based on branch and session
        const openApplications = await OpenApplication.find({ branch, session });

        // Respond with the fetched data using ApiResponse class
        const response = new ApiResponse(200, { openApplications }, "Open applications fetched successfully");
        res.status(response.statusCode).json(response);
    } catch (error) {
        // Handle any errors that may occur during the fetch process
        const apiError = new ApiError(500,"Internal Server Error")
        return res.status(apiError.statusCode).json(apiError);
    }
})
const addRecievedApplication = asyncHandler(async (req, res) => {
    const { hostelno, regnumber, utrno1, utrno2, branch, dateoftransaction, session } = req.body;

    // Check if any field is empty
    if (!hostelno || !regnumber || !utrno1 || !utrno2 || !branch || !dateoftransaction || !session) {
        const apiError = new ApiError(400,"All fields must be filled");
        return res.status(apiError.statusCode).json(apiError);
    }

    try {
        // Find hostelid from the hostel model based on hostelno
        const hostel = await Hostel.findOne({ hostelno });
        if (!hostel) {
            throw new ApiError(405,"Hostel not found");
        }

        // Find studentid from the student model based on regnumber
        const student = await Student.findOne({  regnumber });
        if (!student) {
            throw new ApiError(403,"Student not found");
        }

        // Create a new received application entry
        const newReceivedApplication = new RecievedApplication({
            hostelid: hostel._id,
            studentid: student._id,
            utrno1,
            utrno2,
            branch,
            dateoftransaction,
            session,
        });

        // Save the new received application to the database
        await newReceivedApplication.save();

        // Respond with a success message or any other relevant data
        const response = new ApiResponse(200,{},"Received application created successfully");
        res.status(201).json(response);
    } catch (error) {
        // Handle any errors that may occur during the creation process
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json(error);
        } else if (error.name === "ValidationError") {
            // Validation error handling
            const validationErrors = Object.values(error.errors).map((e) => e.message);
            const errorMessage = `Validation Error: ${validationErrors.join(", ")}`;
            const apiError = new ApiError(404,errorMessage);
            
            console.log(apiError)
            return res.status(apiError.statusCode).json(apiError);
        } else {
            // Generic error handling
            const apiError = new ApiError(501,error.message+"Internal Server Error");
            return res.status(apiError.statusCode).json(apiError);
        }
    }
});
const fetchRecievedApplication = asyncHandler(async (req, res) => {
    const { hostelno, session } = req.body;

    // Check if hostelno and session are provided
    if (!hostelno || !session) {
        const apiError = new ApiError(400,"Hostel number and session must be provided");
        return res.status(apiError.statusCode).json(apiError);
    }

    try {
        // Find hostelid from the hostel model based on hostelno
        const hostel = await Hostel.findOne({ hostelno });
        if (!hostel) {
            throw new ApiError(404,"Hostel not found" );
        }

        // Fetch received applications based on hostelid and session
        const receivedApplications = await RecievedApplication.find({ hostelid: hostel._id, session });

        // Respond with the fetched data using ApiResponse class
        const response = new ApiResponse(200, { receivedApplications }, "Received applications fetched successfully");
        res.status(response.statusCode).json(response);
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
    open_application,fetchApplicationform,addRecievedApplication,fetchRecievedApplication
};
