const express = require("express");
const router = express.Router();

// const StudentSchema = require("../models/student.model");
// const Studentapply = require("../models/studentapply");
// const StudentHostel = require("../models/studentHostel");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const jwtsecret = "Thisisahostelmanagementproject";

const {registerstudent,loginstudent,logoutstudent} = require("../controllers/student.controller.js")
const {verifyJWTstudent} = require("../middlewares/auth.middleware.js");

router.route("/studentreg").post(registerstudent)
router.route("/studentlogin").post(loginstudent)
router.route("/studentlogout").post(verifyJWTstudent,logoutstudent)

// router.post(
//   "/studentreg",
//   [
//     body("email", "Invalid Email").isEmail(),
//     body("name", "Short name").isLength({ min: 5 }),
//     body("password", "Short Password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = await validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const salt = await bcrypt.genSalt(10);
//     let secPassword = await bcrypt.hash(req.body.password, salt);

//     try {
//       await StudentSchema.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: secPassword,
//         phonumber: req.body.phonumber,
//         regnumber: req.body.regnumber,
//         rollnum: req.body.rollnum,
//         dept: req.body.dept,
//         fathername: req.body.fathername,
//         mothername: req.body.mothername,
//         gender: req.body.gender,
//         dob: req.body.dob,
//       });
//       console.log("Successfully Registered Student");
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       // console.log(error)
//       console.log("error happened while registering student");
//       res.json({ success: false });
//     }
//   }
// );
// router.post(
//   "/studentlogin",
//   [
//     body("email", "Invalid Email").isEmail(),
//     body("password", "Short Password").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email;
//     try {
//       let studentData = await StudentSchema.findOne({ email });
//       if (!studentData) {
//         console.log('Student Not found')
//         return res
//           .status(400)
//           .json({ errors: "try Logging with correct credential" });
//       }
//       const pwdCompare = await bcrypt.compare(
//         req.body.password,
//         studentData.password
//       );
//       if (!pwdCompare) {
//         return res.status(400).json({
//           errors: "Wrong Password"
//         });
//       }
//       const data = {
//         student: {
//           id: studentData.id,
//         },
//       };
//       const authToken = jwt.sign(data, jwtsecret);

//       return res.json({
//         success: true,
//         authToken: authToken,
//         studentData: studentData,
//       });
//     } catch (error) {
//       console.log(error);
//       // console.log("error happened");
//       res.json({ success: false });
//     }
//   }
// );
// router.post(
//   "/studentpage",
//   async (req, res) => {
//     let email = req.body.email;
//     try {
//       let studentData = await StudentSchema.findOne({ email }).select(
//         "-password"
//       );
//       if (!studentData) {
//         res.status(400).json({ errors: "Error displaying student data" });
//       }

//       // console.log('');
//       res.json(studentData);
//     } catch (error) {
//       res.send("Server Error", error.message);
//     }
//   }
// );
// router.post(
//   "/studentapply",
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//       await Studentapply.create({
//         name: req.body.name,
//         email: req.body.email,
//         phonumber: req.body.phonumber,
//         regnumber: req.body.regnumber,
//         rollnum: req.body.rollnum,
//         dept: req.body.dept,
//         fathername: req.body.fathername,
//         mothername: req.body.mothername,
//         gender: req.body.gender,
//         roomno: req.body.roomno,
//         semester: req.body.semester,
//         dob: req.body.dob,
//         hostelno: req.body.hostelno,
//       });
//       console.log("Successfully applied");
//       res.json({ success: true });
//     } catch (error) {
//       console.log(error);
//       // console.log(error)
//       console.log("application failed");
//       res.json({ success: false });
//     }
//   }
// );
// router.post(
//   "/studenthostel",
//   async (req, res) => {
    
//     try {
//       let response = await StudentHostel.findOne({email:req.body.email})
//       console.log("Successfully retrieved");
//       if(response){
//       // res.json({studentHostel:response });}

//       await res.json(response);}
//     } catch (error) {
//       console.log(error);
//       // console.log(error)
//       console.log("application failed");
//       res.json({ success: false });
//     }
//   }
// );
module.exports = router;
