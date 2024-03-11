import React, { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useState} from 'react';
const CreateRoom = () => {
    const [credentials, setCredentials] = useState({startno:"",endno:"",capacity:"" });
    
       
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/adminpage/createrooms", {
        credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            startno:credentials.startno,
            endno:credentials.endno,
            capacity:credentials.capacity,
          
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
        <h2>Create Rooms</h2>
        <Form.Group className="input" contorlId="formstart">
          <Form.Label>Enter Hostel Number</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Start Room Number"
            name="startno"
            value={credentials.startno}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formend">
          <Form.Label>Enter End Room Number</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter End Room Number"
            name="endno"
            value={credentials.endno}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formcapacity">
          <Form.Label>Enter Room Capacity</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Room Capacity"
            name="capacity"
            value={credentials.capacity}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="secondary">
      Submit
    </Button>
        </Form>
        </>)
}
 
export default CreateRoom;