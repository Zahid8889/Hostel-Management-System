const express = require("express");
const router = express.Router();


const {registerstudent,loginstudent,logoutstudent,getCurrentstudent} = require("../controllers/student.controller.js")
const {fetchApplicationformStudent,addRecievedApplication} = require("../controllers/application.controller.js")
const {verifyJWTstudent} = require("../middlewares/auth.middleware.js");

router.route("/studentreg").post(registerstudent)
router.route("/studentlogin").post(loginstudent)
router.route("/studentlogout").post(verifyJWTstudent,logoutstudent)

router.route("/studentpage").post(verifyJWTstudent,getCurrentstudent)

router.route("/getapplication").post(verifyJWTstudent,fetchApplicationformStudent)

router.route("/postapplication").post(verifyJWTstudent,addRecievedApplication)



module.exports = router;
