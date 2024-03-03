const { asyncHandler } = require("../utils/asynchandler.js");
const {ApiError} = require("../utils/ApiError.js")
const Room = require("../models/rooms.model.js")
const Hostel = require("../models/hostel.model.js")
const AdminAllotted = require("../models/admin.hostel.model.js")
const RoomAllotted = require("../models/room.occupied.model.js")
const { ApiResponse } = require("../utils/ApiResponse.js")


const createHostel = asyncHandler(async (req, res) => {
    const { hostelno } = req.body;

    // Validate input
    if (!hostelno) {
        throw new ApiError(400, "Missing required parameters");
    }

    // Check if hostel number is unique
    const existingHostel = await Hostel.findOne({ hostelno });
    if (existingHostel) {
        throw new ApiError(400, "Hostel number already exists");
    }

    // Create hostel
    const newHostel = new Hostel({ hostelno });
    const createdHostel = await newHostel.save();

    const successResponse = new ApiResponse(200, createdHostel, "Hostel created successfully");
    res.json(successResponse);
});


const createRoom = asyncHandler(async (req,res)=>{
    const { startno, endno, capacity } = req.body;

    const adminid = req.admin._id;

    // Step 1: Find the hostelId allotted to the admin from AdminAllotted db using admin id
    const adminAllotted = await AdminAllotted.findOne({ adminid });
    if (!adminAllotted) {
        throw new ApiError(400, "Hostel not allotted to this admin");
    }

    const { hostelid } = adminAllotted;

    if (!startno || !endno || !capacity) {
        throw new ApiError(400, "Missing required parameters");
    }

    if (startno > endno) {
        throw new ApiError(400,"Invalid room range");
    }
    const hostel = await Hostel.findById(hostelid);
    if (!hostel) {
        throw new ApiError(400, "Hostel not found");
    }
    const roomsToCreate = [];
    for (let roomNumber = startno; roomNumber <= endno; roomNumber++) {
        roomsToCreate.push({
            hostelid: hostel._id,
            roomNumber,
            capacity,
        });
    }

    // Create rooms in bulk
    const createdRooms = await Room.insertMany(roomsToCreate);

    res.json(new ApiResponse(200,createdRooms,"Rooms created successfully"));
})

const viewrooms = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
     // Step 1: Find the hostelId allotted to the admin from AdminAllotted db using admin id
     const adminAllotted = await AdminAllotted.findOne({ adminid });
     if (!adminAllotted) {
         throw new ApiError(400, "Hostel not allotted to this admin");
     }
 
     const { hostelid } = adminAllotted;
 
     // Step 2: Find all rooms of that hostel from rooms using hostelId
     const rooms = await Room.find({ hostelid: hostelid });
 
     res.json(new ApiResponse(200,rooms,"rooms returned"));
})
const viewRoomcapacity = asyncHandler(async(req,res)=>{
    const adminid = req.admin._id
    const { allottedsession } = req.body;
    // Step 1: Find the hostelId allotted to the admin from AdminAllotted db using admin id
    const adminAllotted = await AdminAllotted.findOne({ adminid });
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
    const rooms = await Room.find({ hostelid });

    // Step 3: Find all the students in each room using room allotted schema
    const roomCapacities = [];
    for (const room of rooms) {
        const studentsInRoom = await RoomAllotted.find({ roomid: room._id, allottedsession });
        const occupiedCapacity = studentsInRoom.length;
        const remainingCapacity = room.capacity - occupiedCapacity;
        roomCapacities.push({
            roomNumber: room.roomNumber,
            totalCapacity: room.capacity,
            occupiedCapacity,
            remainingCapacity
        });
    }
    res.json(new ApiResponse(200,roomCapacities,"room details fetched correctly"))
})

module.exports = {
    createHostel,
    createRoom,
    viewrooms,
    viewRoomcapacity
};