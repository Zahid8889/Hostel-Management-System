const express = require("express");
const router = express.Router();


const { registeradmin, loginadmin, logoutadmin, getCurrentadmin, getstudents, gethostel } = require("../controllers/admin.controller.js")
const { createHostel, createRoom, viewrooms, viewRoomcapacity ,allotRoom} = require("../controllers/hostel.controller.js")
const { open_application, fetchRecievedApplication } = require("../controllers/application.controller.js")
const { verifyJWTadmin } = require("../middlewares/auth.middleware.js");
// const Admin = require("../models/admin.model.js")
// const Hostel = require("../models/hostel.model.js")
// const adminAllotted = require("../models/admin.hostel.model.js");
// const { asyncHandler } = require("../utils/asynchandler.js");

router.route("/adminreg").post(registeradmin)
router.route("/adminlogin").post(loginadmin)
router.route("/adminpage").post(verifyJWTadmin, getCurrentadmin)
router.route("/adminpage/admindetails").post(verifyJWTadmin, getCurrentadmin)

router.route("/adminlogout").post(verifyJWTadmin, logoutadmin)
router.route("/createhostel").post(verifyJWTadmin, createHostel)

router.route("/createrooms").post(verifyJWTadmin, createRoom)
router.route("/viewrooms").post(verifyJWTadmin, viewrooms)

router.route("/gethostel").post(verifyJWTadmin, gethostel)

router.route("/getstudents").post(verifyJWTadmin, getstudents)
router.route("/adminpage/getstudents").post(verifyJWTadmin, getstudents)



router.route("/adminpage/openapplication").post(verifyJWTadmin, open_application)

router.route("/adminpage/fetchapplication").post(verifyJWTadmin, fetchRecievedApplication)

router.route("/roomdetail").post(verifyJWTadmin, viewRoomcapacity)

router.route("/allotroom").post(verifyJWTadmin,allotRoom)

// router.route("/verifyapplication").post(verifyJWTadmin,verifyapplication)
// router.route("/fetchverifiedapplication").post(verifyJWTadmin,fetchverifiedApplication)

// router.route("/allotadmin").post(asyncHandler(async (req,res)=>{
//     const {email,hostelno} = req.body
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//         throw new ApiError(404, "Admin not found");
//     }

//     // Step 2: Find the ID of the hostel using the hostel number from the Hostel database
//     const hostel = await Hostel.findOne({ hostelno });
//     if (!hostel) {
//         throw new ApiError(404, "Hostel not found");
//     }
//     console.log('yes')
//     // Step 3: Create and save an entry in the AdminAllotted database using the IDs obtained
//     const allotment = new adminAllotted({
//         adminid: admin._id,
//         hostelid: hostel._id
//     });
//     await allotment.save();

//     res.json({ message: "Admin allotted successfully" });
// }))
module.exports = router