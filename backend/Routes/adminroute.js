const express = require("express");
const router = express.Router();
const adminSchema = require("../models/AdminReg");
const studentSchema = require("../models/studentReg");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Studentapply = require("../models/studentapply");
const StudentHostel = require("../models/studentHostel");
const studentHostel = require("../models/studentHostel");
const jwtsecret = "Thisisahostelmanagementproject";

router.post(
  "/adminreg",
  [
    body("email", "Invalid Email").isEmail(),
    body("name", "Short name").isLength({ min: 5 }),
    body("password", "Short Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await adminSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        phonumber: req.body.phonumber,
        dept: req.body.dept,
        fathername: req.body.fathername,
        gender: req.body.gender,
        dob: req.body.dob,
        hostelno: req.body.hostelno,
      });
      console.log("Successfully Created Admin Profile");
    
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      // alert(error)
      console.log("error happened");
      res.json({ success: false });
    }
  }
);
router.post(
  "/adminlogin",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Short Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let adminData = await adminSchema.findOne({ email });
      if (!adminData) {
        return res
          .status(400)
          .json({ errors: "Admin not found" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        adminData.password
      );
      if (!pwdCompare) {
        return res.status(400).json({
          errors: "try Logging with correct credential"
        });
      }
      const data = {
        admin: {
          id: adminData.id,
        },
      };
      const authToken = jwt.sign(data, jwtsecret);
      console.log('Admin Login');
      // res.render(adminData);
      return res.json({
        success: true,
        authToken: authToken,
        hostelno: adminData.hostelno,
      });
    } catch (error) {
      console.log(error);
      console.log("error happened");
      res.json({ success: false });
    }
  }
);

router.post("/adminpage", async (req, res) => {
  let email = req.body.email;
  try {
    let adminData = await adminSchema.findOne({ email }).select("-password");
    if (!adminData) {
      res.status(400).json({ errors: "Error displaying admin data" });
    }
    // console.log(adminData, "log from api");
    let hostelStudents = await studentHostel.find({
      hostelno: adminData.hostelno,
    });
    res.send([adminData, hostelStudents]);
  } catch (error) {
    res.send("Server Error", error.message);
  }
});
router.post("/studentapplied", async (req, res) => {
  let hno = req.body.hostelno;
  try {
    // console.log(adminData, "log from api");
    let hostelStudents = await Studentapply.find({ hostelno: hno });
    res.send(hostelStudents);
  } catch (error) {
    res.send("Server Error", error.message);
  }
});
router.post("/studentaccept", async (req, res) => {
  let regno = req.body.regnumber;
  try {
    // console.log(adminData, "log from api");
    let hostelStudent = await Studentapply.findOneAndRemove({
      regnumber: regno,
    });
    try {
      await StudentHostel.create({
        name: hostelStudent.name,
        email: hostelStudent.email,
        phonumber: hostelStudent.phonumber,
        regnumber: hostelStudent.regnumber,
        rollnum: hostelStudent.rollnum,
        dept: hostelStudent.dept,
        fathername: hostelStudent.fathername,
        mothername: hostelStudent.mothername,
        gender: hostelStudent.gender,
        roomno: hostelStudent.roomno,
        semester: hostelStudent.semester,
        dob: hostelStudent.dob,
        hostelno: hostelStudent.hostelno,
      });
      res.json({ success: true });
      console.log("Successfully accepted");
    } catch (error) {
      console.log(error);
      // alert(error)
      // console.log("error happened");
      res.json({ success: false });
    }
  } catch (error) {
    res.send("Server Error", error.message);
  }
});
router.post("/studentreject", async (req, res) => {
  let regno = req.body.regnumber;
  try {
    let del = await Studentapply.findOneAndRemove({
      regnumber: regno,
    });
    if(del){
      console.log('successfully removedapi');
      res.send({success:true});
    }
    else{
      console.log('Already rejected');
      res.send({success:false});

    }
//alert
  } catch (error) {
    res.status(400).send("Server Error", error.message);
  }
});
module.exports = router;
