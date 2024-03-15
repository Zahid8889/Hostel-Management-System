import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const Complaints = () => {

    



    return ( <>
    <div>
    <Link className="btn btn-lg  navi" to="/studentpage/postcomplaint">
              Add complaint
        </Link>
        <Link className="btn btn-lg  navi" to="/studentpage/viewcomplaint">
              View complaints
        </Link>
          
          
    

    </div>
    
    
    
    
    </> );
}
 
export default Complaints;