import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./reg.css";


const RegisterStudent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phonumber: "",
    regnumber: "",
    rollnum: "",
    dept: "",
    fathername: "",
    mothername: "",
    gender: "",
    dob: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:5000/api/studentreg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        phonumber: credentials.phonumber,
        regnumber: credentials.regnumber,
        rollnum: credentials.rollnum,
        dept: credentials.dept,
        fathername: credentials.fathername,
        mothername: credentials.mothername,
        gender: credentials.gender,
        dob: credentials.dob,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid Credentials ");
    
    }
    else
    {
      alert("Successfully Registered");
      navigate("/logstu");
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <Form className="form" onSubmit={handleSubmit}>
        <h2>Register as Student</h2>

        <Form.Group className="input" controlId="formName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            className="control"
            type="text"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" contorlId="formEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
           className="control"
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Create Password</Form.Label>
          <Form.Control
           className="control"
            type="password"
            placeholder="Create Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Phone Number</Form.Label>
          <Form.Control
           className="control"
            type="number"
            placeholder="Enter Phone Number"
            name="phonumber"
            value={credentials.phonumber}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Registration Number</Form.Label>
          <Form.Control
           className="control"
            type="number"
            placeholder="Enter Registration Number"
            name="regnumber"
            value={credentials.regnumber}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Roll Number</Form.Label>
          <Form.Control
           className="control"
            type="number"
            placeholder="Enter Roll Number"
            name="rollnum"
            value={credentials.rollnum}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Department</Form.Label>
          <Form.Control
           className="control"
            type="text"
            placeholder="Enter Department"
            name="dept"
            value={credentials.dept}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Father's Name</Form.Label>
          <Form.Control
           className="control"
            type="text"
            placeholder="Enter Father's Name"
            name="fathername"
            value={credentials.fathername}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Mother's Name</Form.Label>
          <Form.Control
           className="control"
            type="text"
            placeholder="Enter Mother's Name"
            name="mothername"
            value={credentials.mothername}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Gender</Form.Label>
          <Form.Control
           className="control"
            type="text"
            placeholder="Enter Gender"
            name="gender"
            value={credentials.gender}
            onChange={onChange}
          />
        </Form.Group>
        
        
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control
           className="control"
            type="date"
            placeholder="Enter DOB"
            name="dob"
            
            value={credentials.dob}
            onChange={onChange}
          />
        </Form.Group>
        

        <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default RegisterStudent;
