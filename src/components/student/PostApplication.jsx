import React, { Component } from 'react';
import { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const PostApplication = () => {
    const location=useLocation();
    console.log(location.state.data.openApplications.hostelid);
    const hostelid=location.state.data.openApplications.hostelid;
    const session=location.state.data.openApplications.session;
    const allotmentsession=location.state.data.openApplications.allotmentsession;
    const dept=location.state.data.openApplications.dept;
    const [credentials, setCredentials] = useState({
        utrno1:"",
        utrno2:"",
     
        dateoftransaction:"",
     
    
      });
      const onChange = (event) => {
        setCredentials({
          ...credentials,
          [event.target.name]: event.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
        const response = await fetch("http://localhost:5000/api/studentpage/postapplication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
         
            
          },
          credentials: 'include',
          body: JSON.stringify({
            hostelid:hostelid,
            dept: dept,
   
            utrno1:credentials.utrno1,
            utrno2:credentials.utrno2,
            session:session,
            allotmentsession:allotmentsession,
            dateoftransaction:credentials.dateoftransaction
          }),
        });
        const json = await response.json();
        // console.log(hostelid);
        console.log(json);
        if (!json.success) {
          alert("Enter valid Credentials ");
        
        }
        else
        {
          alert("Successfully applied");
        
        }
      };
    
    return (<>
     <Form className="form" onSubmit={handleSubmit}>
        <h2>Apply For Hostel</h2>
        
        
        <Form.Group className="input" controlId="formUTR1">
          <Form.Label>Enter UTR No. 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UTR Number 1"
            name="utrno1"
            value={credentials.utrno1}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formUTR2">
          <Form.Label>Enter UTR No. 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UTR Number 2"
            name="utrno2"
            value={credentials.utrno2}
            onChange={onChange}
          />
        </Form.Group>
       
       
        <Form.Group className="input" controlId="formDateOfTransaction">
          <Form.Label>Enter Date of Transaction</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Date of Transaction"
            name="dateoftransaction"
            value={credentials.dateoftransaction}
            onChange={onChange}
          />
        </Form.Group>
        <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
    </>  );
}
 
export default PostApplication;