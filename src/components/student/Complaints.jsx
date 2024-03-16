import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GetComplaint from './GetComplaint';
import PostComplaint from './PostComplaint';
import { Route,Routes } from 'react-router-dom';
const Complaints = () => {

    



    return ( <>
    <div>
    <div>
    <Link className="btn btn-lg  navi" to="/studentpage/complaint/postcomplaint">
              Add complaint
        </Link>
        <Link className="btn btn-lg  navi" to="/studentpage/complaint/getcomplaint">
              View complaints
        </Link>
          
          
    

    </div>
    <div>
  <Routes>
  <Route path="/" element={<GetComplaint />} />
  <Route path="/getcomplaint" element={<GetComplaint />} />
  <Route path="/postcomplaint" element={<PostComplaint />} />

 
</Routes>
    


    </div>
    </div>
    
    
    
    
    </> );
}
 
export default Complaints;