import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./reg.css";
const RegisterSuper=()=>
{
    const [credentials, setCredentials] = useState({ designation: "", name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (!(json.success)) {
      // alert("Enter valid Credentials ");
      alert(json.success);
    }
  }
 
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
return (
    <div>
        
      <Form className="form" onSubmit={handleSubmit}>
      <h2>Register as Super Admin</h2>

        

        <Form.Group className='input' controlId="formName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' contorlId="formEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={credentials.email} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Create Password</Form.Label>
          <Form.Control type="password" placeholder="Create Password" name="password" value={credentials.password} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Phone Number" name="phonumber" value={credentials.phonumber} onChange={onChange} />
        </Form.Group>
       
        
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Father's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Father's Name" name="fathername" value={credentials.fathername} onChange={onChange} />
        </Form.Group>
        
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter Gender" name="gender" value={credentials.gender} onChange={onChange} />
        </Form.Group>
        
      
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control type="date" placeholder="Enter DOB" name="dob" value={credentials.dob} onChange={onChange} />
        </Form.Group>
        

        <hr />
        <Button type="submit" variant="secondary">Submit</Button>


      </Form>

    </div>
  );

};
export default RegisterSuper;