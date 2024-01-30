import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import './studenthostel.css';
const StudentApplied = () => {
    const [studentData, setstudentData] = useState([]);

  const fetchAdmin = async () => {
    const branch = localStorage.getItem("branch");
    const session = localStorage.getItem("session");
    await fetch("http://localhost:5000/api/adminpage/fetchapplication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branch:branch, session:session }),
    }).then(async (res) => {
      
      let response = await res.json();
      console.log(response);
    //   await setstudentData(response.data.getstudents);
      // await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
    return ( <>
         {studentData.length!==0?(
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
      </>}
    </> );
}
 
export default StudentApplied;