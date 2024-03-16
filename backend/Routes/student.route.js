const express = require("express");
const router = express.Router();


const {registerstudent,loginstudent,logoutstudent,getCurrentstudent} = require("../controllers/student.controller.js")
const {fetchApplicationformStudent,addRecievedApplication} = require("../controllers/application.controller.js")
const {verifyJWTstudent} = require("../middlewares/auth.middleware.js");
const {retrieveNoticeStudent} = require("../controllers/notice.controller.js");
const {postComplaint,resolveComplaint,retrieveComplaintStudent} = require("../controllers/complaint.controller.js");
const {upload} = require('../middlewares/multer.middleware.js')

router.route("/studentreg").post(registerstudent)
// router.route("/studentreg").post(upload.fields([
//     {
//         name: "studentImage",
//         maxCount: 1
//     }
// ]),registerstudent)
router.route("/studentlogin").post(loginstudent)
router.route("/studentlogout").post(verifyJWTstudent,logoutstudent)
router.route("/studentpage/studentdetails").post(verifyJWTstudent,getCurrentstudent)
router.route("/studentpage/getapplication").post(verifyJWTstudent,fetchApplicationformStudent)
router.route("/studentpage/postapplication").post(verifyJWTstudent,addRecievedApplication)



router.route("/studentpage/getnotice").post(verifyJWTstudent,retrieveNoticeStudent)
router.route('/studentpage/complaint/postcomplaint').post(verifyJWTstudent,postComplaint)
router.route('/studentpage/complaint/resolvecomplaint').post(verifyJWTstudent,resolveComplaint)
router.route('/studentpage/complaint/getcomplaint').post(verifyJWTstudent,retrieveComplaintStudent)


module.exports = router;
