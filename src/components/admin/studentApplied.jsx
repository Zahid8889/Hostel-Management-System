import React, { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import './studenthostel.css';
import { useNavigate } from 'react-router-dom';
const StudentApplied = (props) => {
   
    const [credentials, setCredentials] = useState({allotmentsession:"" });
    let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/adminpage/fetchapplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
      body: JSON.stringify({ allotmentsession:credentials.allotmentsession }),
    }).then(async (response) => {
      console.log("Xy")
      let json = await response.json();
      navigate('/adminpage/viewapplication',{state:json});
   
    //   await setstudentData(response.data.getstudents);
      // await setstudentData(response[1]);
    });
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

    return ( <>

          <Form className="form" >
            <h2>Fetch Student Application</h2>
            <Form.Group className="input">
              <Form.Label>Enter Allotment Session</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Allotment Session"
                name="allotmentsession"
                value={credentials.allotmentsession}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" variant="secondary" onClick={handleSubmit}>
          Submit
        </Button>
            </Form>

    </> );
}
 
export default StudentApplied;