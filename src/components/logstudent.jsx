import React, { useState, Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./reg.css";
const LogStudent = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/studentlogin", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.authToken);
      navigate("/studentpage");
      // alert('navigated');
    } else {
      console.log("error");
      alert("Enter Valid Credentials");
    }
  };
  
  return (
    <div>
      <Form className="form" onSubmit={handleSubmit}>
        <h2>Login as Student</h2>
        <Form.Group className="input" contorlId="formEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={credentials.password}
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

export default LogStudent;
