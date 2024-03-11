import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import AdminDetails from './adminDetails';
import StudentHostel from './studentHostel';
import OpenApp from './openHostelApplication';
import StudentApplied from './studentApplied';
import CreateHostel from './CreateHostel';
import CreateRoom from './CreateRoom';
import ViewRoom from './ViewRoom';
import { useState,useEffect } from 'react';
import './admin.css';
import ViewOneRoom from './ViewOneRoom';
import Prac from './prac';
import Bit from './bit';
const Admin = () => {
  let navigate = useNavigate();
  const [adminData, setadminData] = useState([]);
  const[hostel,sethostel]=useState([]);
  

  const fetchAdmin = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/adminpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
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
  
  const fetchHostel = async () => {
    const adminid=adminData._id;
    console.log("X")
    await fetch("http://localhost:5000/api/gethostel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ adminid: adminid }),
    }).then(async (res) => {
      let response = await res.json();
      console.log(response);
      await sethostel(response.data.hostel);
      // await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchHostel();
  }, []);
  if(hostel.hostelno==undefined){
  return(
    <>
    <div className='admin'> 
    <div className='admin1'>
        <h2>BIT Sindri</h2>
        <h3>Hostel  No. {adminData.hostelno}</h3>  
        <Link className="btn btn-lg  navi" to="/adminpage/admindetails">
              Details
        </Link>
          
        
        
         

    </div>
    <div className='admin2'>
  <Routes>
  <Route path="/" element={<AdminDetails />} />
  <Route path="/admindetails" element={<AdminDetails />} />
  
</Routes>
    


    </div>


    </div>
    
    </>
);}
else{
  return (
    <>
    <div className='admin'> 
    <div className='admin1'>
        <h2>BIT Sindri</h2>
        <h3>Hostel  No. {adminData.hostelno}</h3>  
        <Link className="btn btn-lg  navi" to="/adminpage/admindetails">
              Details
        </Link>
          
          <Link className="btn btn-lg  navi" to="/adminpage/getstudents">
              Students
            </Link>
            <Link className="btn btn-lg  navi" to="/adminpage/createrooms">
              Create Rooms
            </Link>
            <Link className="btn btn-lg  navi" to="/adminpage/viewrooms">
              View Rooms
            </Link>
            <Link className="btn btn-lg  navi" to="/adminpage/roomdetail">
              View Room Detail
            </Link>
          {/* <Nav.Link className="btn btn-md btn-outline-dark "> */}
            <Link className="btn btn-lg navi" to="/adminpage/openapplication">
              Open Application
            </Link>
          {/* </Nav.Link> */}
          <Link className="btn btn-lg btn-ouline-dark navi" to="/adminpage/fetchapplication">
              Application
            </Link>
            <Link className="btn btn-lg btn-ouline-dark navi" to="/adminpage/bit">
              Bit
            </Link>
         

    </div>
    <div className='admin2'>
  <Routes>
  <Route path="/" element={<AdminDetails />} />
  <Route path="/admindetails" element={<AdminDetails />} />
  <Route path="/getstudents" element={<StudentHostel />} />
  <Route path="/openapplication" element={<OpenApp />} />
  <Route path="/createrooms" element={<CreateRoom />} />
  <Route path="/viewrooms" element={<ViewRoom  />} />
  <Route path="/roomdetail" element={<ViewOneRoom  />} />

  <Route path="/fetchapplication" element={<StudentApplied adminid={adminData._id} />} />
  {/* <Route path="" */}
  {/* <Route path="/" */}
  <Route path="/prac" element={<Prac />} />
  <Route path="/bit" element={<Bit />} />
  
</Routes>
    


    </div>


    </div>
    
    </>
);}
}
 
export default Admin;

