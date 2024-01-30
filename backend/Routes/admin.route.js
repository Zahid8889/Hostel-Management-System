const express = require("express");
const router = express.Router();


const {registeradmin,loginadmin,logoutadmin,getCurrentadmin,getstudents} = require("../controllers/admin.controller.js")
const {createHostel,createRoom} = require("../controllers/hostel.controller.js")
const {open_application,fetchRecievedApplication} = require("../controllers/application.controller.js")
const {verifyJWTadmin} = require("../middlewares/auth.middleware.js");

router.route("/adminreg").post(registeradmin)
router.route("/adminlogin").post(loginadmin)
router.route("/adminpage").post(getCurrentadmin)
router.route("/getstudents").post(getstudents)
router.route("/adminpage/getstudents").post(getstudents)
router.route("/adminpage/admindetails").post(getCurrentadmin)
router.route("/adminlogout").post(verifyJWTadmin,logoutadmin)
router.route("/createhostel").post(createHostel)
router.route("/createrooms").post(createRoom)


router.route("/adminpage/openapplication").post(open_application)
router.route("/adminpage/fetchapplication").post(fetchRecievedApplication)
module.exports= router