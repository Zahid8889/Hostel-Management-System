import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./reg.css";
const RegisterAdmin = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phonumber: "",
    dept: "",
    fathername: "",
    gender: "",
    dob: "",
    hostelno: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
    const response = await fetch("http://localhost:5000/api/adminreg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        phonumber: credentials.phonumber,
        dept: credentials.dept,
        fathername: credentials.fathername,
        gender: credentials.gender,
        dob: credentials.dob,
        hostelno: credentials.hostelno
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid Credentials ");
      // alert(json.success);
    }else{
      alert('Successfully registered');
      navigate("/logadm");
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
        <h2>Register as Admin</h2>

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
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control
          className="control"
            type="number"
            placeholder="Enter Hostel Number"
            name="hostelno"
            value={credentials.hostelno}
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
export default RegisterAdmin;
