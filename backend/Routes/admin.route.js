const express = require("express");
const router = express.Router();


const {registeradmin,loginadmin,logoutadmin} = require("../controllers/admin.controller.js")
const {verifyJWTadmin} = require("../middlewares/auth.middleware.js");

router.route("/adminreg").post(registeradmin)
router.route("/adminlogin").post(loginadmin)
router.route("/adminlogout").post(verifyJWTadmin,logoutadmin)
module.exports= router