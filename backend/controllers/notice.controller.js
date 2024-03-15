const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const { ApiResponse } = require("../utils/ApiResponse.js")
const Notice = require("../models/notice.model.js")
const AdminAllotted = require("../models/admin.hostel.model.js")

const postNotice = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
    const {message} = req.body
    try {
        const adminAllotment = await AdminAllotted.findOne({ adminid: adminid });
        if (!adminAllotment) {
            throw new ApiError(404, "Hostel ID not found for this admin");
        }
        const hostelid = adminAllotment.hostelid;

        // Step 2: Create a new notice instance
        const newNotice = new Notice({
            adminid: adminid,
            hostelid: hostelid, // Save the hostel ID along with the notice
            message: message
        });

        // Step 3: Save the notice to the database
        const savedNotice = await newNotice.save();
        if (!savedNotice) {
            throw new ApiError(500, "Error in saving notice");
        }

        // Step 4: Respond with success message
        res.json(new ApiResponse(200, savedNotice, "Notice Posted Successfully"));
    } catch (error) {
        res.json(new ApiError(500, "Internal Server Error"));
    }
})

const retrieveNoticeAdmin = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
    try {
        // Find all notices where adminid matches the provided adminid
        const notices = await Notice.find({ adminid: adminid });

        res.json(new ApiResponse(200,notices,"Notice fetched Successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(501,"Internal Server Error" ));
    }
})
const retrieveNoticeStudent = asyncHandler(async(req,res)=>{
    
    try {
        // Find all notices where adminid matches the provided adminid
        const notices = await Notice.find({ });

        res.json(new ApiResponse(200,notices,"Notice fetched Successfully"));
    } catch (error) {
        console.error(error);
        res.json(new ApiError(501,"Internal Server Error" ));
    }
})
module.exports = {postNotice,retrieveNoticeAdmin,retrieveNoticeStudent}