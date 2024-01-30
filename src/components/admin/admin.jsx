import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import AdminDetails from './adminDetails';
import StudentHostel from './studentHostel';
import OpenApp from './openHostelApplication';
import StudentApplied from './studentApplied';
import { useState,useEffect } from 'react';
import './admin.css';
const Admin = () => {
  let navigate = useNavigate();
  const [adminData, setadminData] = useState([]);
  

  const fetchAdmin = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/adminpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      console.log('y')
      let response = await res.json();
      console.log(response);
      await setadminData(response.data.currentAdmin);
      // await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  return (
    <>
    <div className='admin'> 
    <div className='admin1'>
        <h2>BIT Sindri</h2>
        <h3>Hostel  No. X</h3>  
        <Link className="btn btn-lg  navi" to="/adminpage/admindetails">
              Details
        </Link>
          
          <Link className="btn btn-lg  navi" to="/adminpage/getstudents">
              Students
            </Link>
          {/* <Nav.Link className="btn btn-md btn-outline-dark "> */}
            <Link className="btn btn-lg navi" to="/adminpage/openapplication">
              Open Application
            </Link>
          {/* </Nav.Link> */}
          <Link className="btn btn-lg btn-ouline-dark navi" to="/adminpage/fetchapplication">
              Application
            </Link>
         

    </div>
    <div className='admin2'>
  <Routes>
  <Route path="/" element={<AdminDetails />} />
  <Route path="/admindetails" element={<AdminDetails />} />
  <Route path="/getstudents" element={<StudentHostel />} />
  <Route path="/openapplication" element={<OpenApp />} />

  <Route path="/fetchapplication" element={<StudentApplied />} />
</Routes>
    


    </div>


    </div>
    
    </>
);
}
 
export default Admin;

