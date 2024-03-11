import React, { Component } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import './studenthostel.css';
const StudentApplied = (props) => {
    const [studentData, setstudentData] = useState([]);
    const [credentials, setCredentials] = useState({allotmentsession:"" });
    
  const handleSubmit = async () => {

    await fetch("http://localhost:5000/api/adminpage/fetchapplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminid:props.adminid, allotmentsession:credentials.allotmentsession }),
    }).then(async (res) => {
      
      let response = await res.json();
      console.log(response.data);
    //   await setstudentData(response.data.getstudents);
      // await setstudentData(response[1]);
    });
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

    return ( <>

          <Form className="form" onSubmit={handleSubmit}>
            <h2>Fetch Student Application</h2>
            <Form.Group className="input" contorlId="formallotedsession">
              <Form.Label>Enter Allotment Session</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter Allotment Session"
                name="allotmentsession"
                value={credentials.allotmentsession}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" variant="secondary">
          Submit
        </Button>
            </Form>


         {/* {studentData.length!==0?(
      <Table striped bordered className="table-info">
        <thead className="table-dark">
          <tr>
            <th>Registration Number</th>
            <th>Name</th>
            <th>Roll no</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student) => (
            <tr>
              <td>{student.regnumber}</td>
              <td>{student.name}</td>
              <td>{student.rollnum}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                //   onClick={() => handleAccept(student.regnumber)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  data-value="apply clicked"
                  className="btn btn-danger btn-sm"
                //   onClick={() => handleReject(student.regnumber)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      ):<>
        <h2 id="datanotfound">No Data Found</h2>
      </>} */}
    </> );
}
 
export default StudentApplied;