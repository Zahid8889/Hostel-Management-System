import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../design/tabl.css';


export default function StudentPage() {
  const [studentHostel, setstudentHostel] = useState([]);

  let navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => {
    setShowForm(!showForm);
  };
  const [credentials, setCredentials] = useState({
    // name: "",
    // email: "",
    // phonumber: "",
    regnumber: "",
    // rollnum: "",
    // dept: "",
    // fathername: "",
    // mothername: "",
    // gender: "",
    // roomno: "",
    // semester: "",
    // dob: "",
    hostelno: "",
    utrno1:"",
    utrno2:"",
    branch:"",
    dateoftransaction:"",
    session:""

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
    const response = await fetch("http://localhost:5000/api/postapplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: credentials.name,
        // email: credentials.email,
        // phonumber: credentials.phonumber,
        regnumber: studentData.regnumber,
        // rollnum: credentials.rollnum,
        branch: studentData.dept,
        // fathername: credentials.fathername,
        // mothername: credentials.mothername,
        // gender: credentials.gender,
        // roomno: credentials.roomno,
        // semester: credentials.semester,
        // dob: credentials.dob,
        hostelno: credentials.hostelno,
        utrno1:credentials.utrno1,
        utrno2:credentials.utrno2,
        session:credentials.session,
        dateoftransaction:credentials.dateoftransaction
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid Credentials ");
    
    }
    else
    {
      alert("Successfully applied");
      setShowForm(false);
    }
  };

  // const fetchHostel = async () => {
  // const email = localStorage.getItem("userEmail");
  //   await fetch("http://localhost:5000/api/studentpage", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: email }),
  //   }).then(async (res) => {
  //     let response = await res.json();
  //     await setstudentHostel(response);
  //     console.log(response,"successful student details");
  //   });
  // };
  // useEffect(() => {
  //   fetchHostel();
  // }, []);
  
  
  const [studentData, setstudentData] = useState({});
  const fetchStudent = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/studentpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      let response = await res.json();
      console.log(response)
      await setstudentData(response.data.currentStudent);
    });
  };
  useEffect(() => {
     fetchStudent();
  }, []);
  return(<>
  <div className="tab">
  <Table striped bordered hover className="table-success">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Credential</th>
          <th>Detail</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Name</td>
          <td>{studentData.name}</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Email</td>
          <td>{studentData.email}</td>
          
        </tr>
        <tr>
          <td>3</td>
          <td>Department</td>
          <td>{studentData.dept}</td>
        </tr>
        
        <tr>
          <td>5</td>
          <td>Registration Number</td>
          <td>{studentData.regnumber}</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Roll Number</td>
          <td>{studentData.rollnum}</td>
        </tr>
        
        <tr>
          <td>8</td>
          <td>DOB</td>
          <td>{studentData.dob}</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Father's Name</td>
          <td>{studentData.fathername}</td>
        </tr>
        <tr>
          <td>10</td>
          <td>Mother's Name</td>
          <td>{studentData.mothername}</td>
        </tr>
        <tr>
          <td>11</td>
          <td>Phone Number</td>
          <td>{studentData.phonumber}</td>
        </tr>
        <tr>
          <td>12</td>
          <td>Gender</td>
          <td>{studentData.gender}</td>
        </tr>
        {studentHostel.length!==0?<>
        <tr>
          <td>13</td>
          <td>Hostel</td>
          <td>{studentHostel.hostelno}</td>
        </tr>
        <tr>
          <td>14</td>
          <td>Room No.</td>
          <td>{studentHostel.roomno}</td>
        </tr>
        </>
        :""
        }
       
       
      </tbody>
    </Table>
     
    {/* <div>
      <div className='text-center m-4'>
      <button className="btn btn-lg btn-secondary btn-center" onClick={handleButtonClick}>Show Form</button>
      </div>
      {showForm && (
        <Form className="form" onSubmit={handleSubmit}>
        <h2>Enter Initial Details</h2>
  
        <Form.Group className="input" controlId="formName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" contorlId="formEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </Form.Group> */}
        
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Phone Number"
            name="phonumber"
            value={credentials.phonumber}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Registration Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Registration Number"
            name="regnumber"
            value={credentials.regnumber}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Roll Number</Form.Label>
          <Form.Control
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
            type="text"
            placeholder="Enter Gender"
            name="gender"
            value={credentials.gender}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Room Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Room Number"
            name="roomno"
            value={credentials.roomno}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Semester</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Semester"
            name="semester"
            value={credentials.semester}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter DOB"
            name="dob"
            
            value={credentials.dob}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Hostel Number"
            name="hostelno"
            value={credentials.hostelno}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
      )}
    </div> */}

    <div>
      <div className='text-center m-4'>
      <button className="btn btn-lg btn-secondary btn-center" onClick={handleButtonClick}>Show Form</button>
      </div>
      {showForm && (
        <Form className="form" onSubmit={handleSubmit}>
        <h2>Apply For Hostel</h2>
  
        {/* <Form.Group className="input" controlId="formName">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
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
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </Form.Group>
        
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Phone Number</Form.Label>
          <Form.Control
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
            type="text"
            placeholder="Enter Gender"
            name="gender"
            value={credentials.gender}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Room Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Room Number"
            name="roomno"
            value={credentials.roomno}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Semester</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Semester"
            name="semester"
            value={credentials.semester}
            onChange={onChange}
          />
        </Form.Group> */}
        {/* <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter DOB"
            name="dob"
            
            value={credentials.dob}
            onChange={onChange}
          />
        </Form.Group> */}
        <Form.Group className="input" controlId="formHostelNo">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Hostel Number"
            name="hostelno"
            value={credentials.hostelno}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formUTR1">
          <Form.Label>Enter UTR No. 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UTR Number 1"
            name="utrno1"
            value={credentials.utrno1}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formUTR2">
          <Form.Label>Enter UTR No. 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UTR Number 2"
            name="utrno2"
            value={credentials.utrno2}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formSession">
          <Form.Label>Enter Session</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Session"
            name="session"
            value={credentials.session}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formDateOfTransaction">
          <Form.Label>Enter Date of Transaction</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Date of Transaction"
            name="dateoftransaction"
            value={credentials.dateoftransaction}
            onChange={onChange}
          />
        </Form.Group>
        <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
      )}
    </div>
  </div>
  </>) ;
}


