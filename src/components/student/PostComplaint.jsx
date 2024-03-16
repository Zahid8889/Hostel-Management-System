import React, { Component } from 'react';
import { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
const PostComplaint = () => {
    const [credentials, setCredentials] = useState({
     
        allotmentsession:"",
        message:""
    
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
        const response = await fetch("http://localhost:5000/api/studentpage/complaint/postcomplaint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
         
            
          },
          credentials: 'include',
          body: JSON.stringify({
           
    
            allotmentsession:credentials.allotmentsession,
            message:credentials.message,
            
          }),
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          alert("Enter valid Credentials ");
        
        }
        else
        {
          alert("Complaint Registered")
           
        
        }
      };
    return (<>
    <Form className="form" onSubmit={handleSubmit}>
        <h2>Add Complaint</h2>
  
       
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
        <Form.Group className="input" controlId="formmessage">
          <Form.Label>Enter Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Message"
            name="message"
            value={credentials.message}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        </Form>



    </>  );
}
 
export default PostComplaint;