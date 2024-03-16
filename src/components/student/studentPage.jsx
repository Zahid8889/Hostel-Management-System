import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../design/tabl.css';
import StudentDetails from "./StudentDetails";
import { Routes,Route } from "react-router-dom";
import './student.css';
import GetApplication from "./GetApplications";
import PostApplication from "./PostApplication";
import Complaints from "./Complaints";
import Notices from "./Notices";
import ViewNotices from "./ViewNotices";

export default function StudentPage() {
  
  return(<>
  <div className="tab">
  

<div className='student'> 
    <div className='student1'>  
        <Link className="btn btn-lg  navi" to="/studentpage/studentdetails">
              Details
        </Link>
          
          <Link className="btn btn-lg  navi" to="/studentpage/getapplication">
              Get Applications
            </Link>
            <Link className="btn btn-lg  navi" to="/studentpage/getapplication">
              View Hostel Information
            </Link>
            <Link className="btn btn-lg  navi" to="/studentpage/complaint">
              Submit Complaint
            </Link>
            <Link className="btn btn-lg  navi" to="/studentpage/notice">
              View Notices
            </Link>
           
      
           
         

    </div>
    <div className='admin2'>
  <Routes>
  <Route path="/" element={<StudentDetails />} />
  <Route path="/studentdetails" element={<StudentDetails />} />
  <Route path="/postapplication" element={<PostApplication />} />
  <Route path="/getapplication" element={<GetApplication />} />
  <Route path="/complaint/*" element={<Complaints/>} />
  <Route path="/notice" element={<ViewNotices/>} />
 
</Routes>
    


    </div>


    </div>
    




     
    

   
  </div>
  </>) ;
}


