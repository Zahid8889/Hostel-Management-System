import React, { Component } from 'react';
import { useState,useEffect,useNavigate } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const OpenApp = () => {

    const [credentials, setCredentials] = useState({gender:"", allotedsession:"", branch:"", session:"", endDate:"" });

   
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/adminpage/openapplication", {
        credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            gender:credentials.gender,
            allotmentsession:credentials.allotedsession, 
            dept:credentials.branch, 
            session:credentials.session, 
            endDate:credentials.endDate
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save the auth toke to local storage and redirect
        
        // localStorage.setItem("hostelno", json.hostelno);
        // localStorage.setItem("adminemail", json.adminemail);
        // localStorage.setItem("dept", json.dept);
        // localStorage.setItem("session", json.session);
        // localStorage.setItem("endDate", json.endDate);
        // navigate("/adminpage");
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
        <h2>Open Application</h2>
        <Form.Group className="input" contorlId="formGender">
          <Form.Label>Enter Gender</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Gender"
            name="gender"
            value={credentials.gender}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formAllotedSession">
          <Form.Label>Enter Alloted Session</Form.Label>
          <Form.Control
            type="string"
            placeholder="Alloted Session"
            name="allotedsession"
            value={credentials.allotedsession}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formBranch">
          <Form.Label>Enter Branch</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Branch"
            name="branch"
            value={credentials.branch}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formSession">
          <Form.Label>Enter Session</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Session"
            name="session"
            value={credentials.session}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formEndDate">
          <Form.Label>Enter End Date</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter End Date"
            name="endDate"
            value={credentials.endDate}
            onChange={onChange}
          />
        </Form.Group>
       
        <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>

        

    </> );
}
 
export default OpenApp;