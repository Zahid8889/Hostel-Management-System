import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./reg.css";
const LogSuperAdmin = () => {
  return (
    <div>
       
      <Form className="form">
      <h2>Login as Super Admin</h2>
        <Form.Group  className='input' contorlId="formEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" placeholder="Email"  />
        </Form.Group>
        <Form.Group className='input'  controlId="formPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>
        <hr/>
    <Button type="submit" variant="secondary">Submit</Button>
        
       
      </Form>
      
    </div>
  );
};

export default LogSuperAdmin;
