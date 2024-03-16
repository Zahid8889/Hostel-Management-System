const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const { ApiResponse } = require("../utils/ApiResponse.js")
const Complaint = require("../models/complaint.model.js")
const RoomAllotted = require("../models/room.occupied.model.js")
const AdminAllotted = require("../models/admin.hostel.model.js")


const postComplaint = asyncHandler(async(req,res)=>{
    const studentid = req.student._id
    const {allotmentsession,message} = req.body
    try {
        // Step 1: Find the hostel ID associated with the student from the RoomAllotted model
        const roomAllotment = await RoomAllotted.findOne({ studentid: studentid, allotmentsession: allotmentsession }).populate('hostelid');
        if (!roomAllotment) {
            throw new ApiError(404, "Hostel not found for this student");
        }
        const hostelid = roomAllotment.hostelid._id;

        // Step 2: Save the complaint with the relevant details
        const newComplaint = new Complaint({
            studentid: studentid,
            hostelid: hostelid,
            message: message
        });

        // Save the complaint to the database
        const savedComplaint = await newComplaint.save();
        if (!savedComplaint) {
            throw new ApiError(500, "Error in saving complaint");
        }

        // Step 3: Respond with success message
        res.json(new ApiResponse(200, savedComplaint, "Complaint posted successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(500, "Internal Server Error"));
    }
})

const retrieveComplaintAdmin = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
    try {
        // Step 1: Find the hostel ID associated with the admin from the AdminAllotted model
        const adminAllotment = await AdminAllotted.findOne({ adminid: adminid });
        if (!adminAllotment) {
            throw new ApiError(404, "Hostel ID not found for this admin");
        }
        const hostelid = adminAllotment.hostelid;

        // Step 2: Find all complaints using the hostel ID
        const complaints = await Complaint.find({ hostelid: hostelid ,resolved:false}).populate('studentid');
        console.log(complaints)
        // Step 3: Respond with the complaints
        res.json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(500, "Internal Server Error"));
    }
})
const retrieveComplaintStudent = asyncHandler(async(req,res)=>{
    const studentid = req.student._id
    try {
        // Find all complaints where studentid matches the provided studentid
        const complaints = await Complaint.find({ studentid: studentid });
        
        // Respond with the complaints
        res.json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(500, "Internal Server Error"));
    }
})

const resolveComplaint = asyncHandler(async(req,res)=>{
    const studentid = req.student._id
    const {complaintid} = req.body
    try {
        // Find the complaint by ID and update the 'resolved' field to true
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintid,
            { resolved: true },
            { new: true }
        );

        // Check if the complaint was found and updated
        if (!updatedComplaint) {
            throw new ApiError(404, "Complaint not found");
        }

        // Respond with success message
        res.json(new ApiResponse(200, updatedComplaint, "Complaint resolved successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(500, "Internal Server Error"));
    }
    
})

module.exports  = {postComplaint,resolveComplaint,retrieveComplaintAdmin,retrieveComplaintStudent}