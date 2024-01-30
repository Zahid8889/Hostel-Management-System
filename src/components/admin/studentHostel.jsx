import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { useState,useEffect, useNavigate } from 'react';
import './studenthostel.css';
const StudentHostel = () => {
    // let navigate = useNavigate();
  const [studentData, setstudentData] = useState([]);

  const fetchAdmin = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/adminpage/getstudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
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
    return (
        <>
 
        {studentData.length!==0?(
  <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Registration Number</th>
    <th>Name</th>
    <th>Roll Number</th>
    <th>Room Number</th>
  </tr>
</thead>
<tbody>
  {studentData.map(student=>
    <tr>
      <th>{student.regnumber}</th>
      <th>{student.name}</th>
      <th>{student.rollnum}</th>
      <th>{student.roomno}</th>

    </tr>
    )}
</tbody>
  </Table>
    ):<>
    <h2 id="datanotfound">No data found</h2>
    
    </>}
        </>
    );
}
 
export default StudentHostel;
