const express = require("express");
const router = express.Router();


const {registerstudent,loginstudent,logoutstudent} = require("../controllers/student.controller.js")
const {fetchApplicationform,addRecievedApplication} = require("../controllers/application.controller.js")
const {verifyJWTstudent} = require("../middlewares/auth.middleware.js");

router.route("/studentreg").post(registerstudent)
router.route("/studentlogin").post(loginstudent)
router.route("/getapplication").post(fetchApplicationform)
router.route("/postapplication").post(addRecievedApplication)

router.route("/studentlogout").post(verifyJWTstudent,logoutstudent)


module.exports = router;
