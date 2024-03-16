import React, { Component } from 'react';
import ViewNotice from './ViewNotice';
import PostNotice from './PostNotice';
import { Route,Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Notice = () => {
    return ( <>
        <div>
        <div>
        <Link className="btn btn-lg  navi" to="/adminpage/notice/postnotice">
                  Add Notice
            </Link>
            <Link className="btn btn-lg  navi" to="/adminpage/notice/retrievenotice">
                  View Notices
            </Link>
              
              
        
    
        </div>
        <div>
      <Routes>
      <Route path="/" element={<ViewNotice />} />
      <Route path="/retrievenotice" element={<ViewNotice />} />
      <Route path="/postnotice" element={<PostNotice />} />
    
     
    </Routes>
        
    
    
        </div>
        </div>
        
        
        
        
        </> );




    
}
 
export default Notice;