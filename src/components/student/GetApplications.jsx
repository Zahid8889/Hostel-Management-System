import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

const GetApplication = () => {
    const [credentials, setCredentials] = useState({
     
        allotmentsession:""
    
      });
      let navigate=useNavigate();
      const onChange = (event) => {
        setCredentials({
          ...credentials,
          [event.target.name]: event.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
        const response = await fetch("http://localhost:5000/api/studentpage/getapplication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
         
            
          },
          credentials: 'include',
          body: JSON.stringify({
           
    
            allotmentsession:credentials.allotmentsession,
            
          }),
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          alert("Enter valid Credentials ");
        
        }
        else
        {
          if(json.data.openApplications==null)
          alert("no application form available")
            else
            {
                 navigate('/studentpage/postapplication',{state:json});
            }
           
        
        }
      };
    return (<>
    <Form className="form" onSubmit={handleSubmit}>
        <h2>Apply For Hostel</h2>
  
       
        <Form.Group className="input" controlId="formallotmentsession">
          <Form.Label>Enter Allotment Session</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Allotment Session"
            name="allotmentsession"
            value={credentials.allotmentsession}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        </Form>



    </>  );
}
 
export default GetApplication;