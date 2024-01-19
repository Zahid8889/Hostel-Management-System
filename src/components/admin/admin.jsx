import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import adminDetails from './adminDetails';
import studentHostel from './studentHostel';
import openApp from './openHostelApplication';
import studentApplied from './studentApplied';
import './admin.css';

class Admin extends Component {
    state = {  } 
    render() { 
        return (
            <>
            <div className='admin'> 
            <div className='admin1'>
                <h2>BIT Sindri</h2>
                <h3>Hostel  No. X</h3>  
                <Link className="btn btn-lg  navi" to="/">
                      Details
                </Link>
                  
                  <Link className="btn btn-lg  navi" to="/">
                      Students
                    </Link>
                  {/* <Nav.Link className="btn btn-md btn-outline-dark "> */}
                    <Link className="btn btn-lg navi" to="/">
                      Open Application
                    </Link>
                  {/* </Nav.Link> */}
                  <Link className="btn btn-lg btn-ouline-dark navi" to="/">
                      Application
                    </Link>
                 

            </div>
            <div>
          <Routes>
          <Route path="/" element={<adminDetails />} />
          <Route path="/studenthostel" element={<studentHostel />} />
          <Route path="/openapplication" element={<openApp />} />
     
          <Route path="/studentapplied" element={<studentApplied />} />
        </Routes>
            


            </div>


            </div>
            
            </>
        );
    }
}
 
export default Admin;