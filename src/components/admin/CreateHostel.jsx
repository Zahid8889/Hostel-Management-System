import React, { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
const CreateHostel = () => {
 

        const [credentials, setCredentials] = useState({hostelno:"" });
    
       
        const handleSubmit = async (e) => {
          e.preventDefault();
          const response = await fetch("http://localhost:5000/api/adminpage/createhostel", {
            credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostelno:credentials.hostelno,
              
            }),
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            //save the auth toke to local storage and redirect
            
            // localStorage.setItem("hostelno", json.hostelno);
         
            alert('Application Accepted');
          } else {
            console.log("error");
            alert("Enter Valid Credentials");
          }
        };
      
        const onChange = (event) => {
          setCredentials({ ...credentials, [event.target.name]: event.target.value });
        };
        return ( <>
        <Form className="form" onSubmit={handleSubmit}>
            <h2>Create Hostel</h2>
            <Form.Group className="input" contorlId="formhostel">
              <Form.Label>Enter Hostel Number</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter Hostel Number"
                name="hostelno"
                value={credentials.hostelno}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" variant="secondary">
          Submit
        </Button>
            </Form>
            </>)
            



}
 
export default CreateHostel;
 
