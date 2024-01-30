const express = require("express");
const router = express.Router();


const {registeradmin,loginadmin,logoutadmin} = require("../controllers/admin.controller.js")
const {createHostel,createRoom} = require("../controllers/hostel.controller.js")
const {open_application,fetchRecievedApplication} = require("../controllers/application.controller.js")
const {verifyJWTadmin} = require("../middlewares/auth.middleware.js");

router.route("/adminreg").post(registeradmin)
router.route("/adminlogin").post(loginadmin)
router.route("/adminlogout").post(verifyJWTadmin,logoutadmin)
router.route("/createhostel").post(createHostel)
router.route("/createrooms").post(createRoom)
router.route("/openapplication").post(open_application)
router.route("/fetchapplication").post(fetchRecievedApplication)
module.exports= router