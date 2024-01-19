import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./reg.css";


const Register = () => {
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
  const Student=()=>{
    <Form className="form1">
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
          <Form.Label>Enter Registration Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Registration Number" name="regnumber" value={credentials.regnumber} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Roll Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Roll Number" name="rollnum" value={credentials.rollnum} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Department</Form.Label>
          <Form.Control type="text" placeholder="Enter Department" name="dept" value={credentials.dept} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Father's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Father's Name" name="fathername" value={credentials.fathername} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Mother's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Mother's Name" name="mothername" value={credentials.mothername} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter Gender" name="gender" value={credentials.gender} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Room Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Room Number" name="roomno" value={credentials.roomno} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Semester</Form.Label>
          <Form.Control type="number" placeholder="Enter Semester" name="semester" value={credentials.semester} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control type="date" placeholder="Enter DOB" name="dob" value={credentials.dob} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control type="number" placeholder="Enter Hostel Number" name="hostelno" value={credentials.hostelno} onChange={onChange} />
        </Form.Group>


    </Form>
    

  }

  const Admin=()=>{
    <Form className="form2">
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
    </Form>

  }
  const Super=()=>
  {
    <Form className="form3">
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
    </Form>
  }


  return (
    <div>
      {/* <Form className="form" onSubmit={handleSubmit}>
        <h6>Select your designation</h6> */}
        <Form.Select aria-label="formSelect" name="designation" value={credentials.designation} onChange={onChange}>
          <option value="1" onSelect={this.Student()}>Student</option>
          <option value="2" onSelect={this.Admin()}>Admin</option>
          <option value="3" onSelect={this.Super()}>Super Admin</option>
        </Form.Select>

        

        {/* <Form.Group className='input' controlId="formName">
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
          <Form.Label>Enter Registration Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Registration Number" name="regnumber" value={credentials.regnumber} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Roll Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Roll Number" name="rollnum" value={credentials.rollnum} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Department</Form.Label>
          <Form.Control type="text" placeholder="Enter Department" name="dept" value={credentials.dept} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Father's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Father's Name" name="fathername" value={credentials.fathername} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Mother's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Mother's Name" name="mothername" value={credentials.mothername} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Gender</Form.Label>
          <Form.Control type="text" placeholder="Enter Gender" name="gender" value={credentials.gender} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Room Number</Form.Label>
          <Form.Control type="number" placeholder="Enter Room Number" name="roomno" value={credentials.roomno} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Semester</Form.Label>
          <Form.Control type="number" placeholder="Enter Semester" name="semester" value={credentials.semester} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control type="date" placeholder="Enter DOB" name="dob" value={credentials.dob} onChange={onChange} />
        </Form.Group>
        <Form.Group className='input' controlId="formPassword">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control type="number" placeholder="Enter Hostel Number" name="hostelno" value={credentials.hostelno} onChange={onChange} />
        </Form.Group>

        <hr />
        <Button type="submit" variant="secondary">Submit</Button>


      </Form> */}

    </div>
  );
};

export default Register;
