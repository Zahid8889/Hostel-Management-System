import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
const AdminDetails = () => {
 
  const [adminData, setadminData] = useState([]);

  const fetchAdmin = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/adminpage/admindetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      console.log('y')
      let response = await res.json();
      console.log(response);
      await setadminData(response.data.currentAdmin);
      // await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
    return (
        <>
         <Table striped bordered className="table-success">
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
        <td>{adminData.name}</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Email</td>
        <td>{adminData.email}</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Department</td>
        <td>{adminData.dept}</td>
      </tr>
      {/* <tr>
        <td>4</td>
        <td>Hostel No.</td>
        <td>{adminData.hostelno}</td>
      </tr> */}
      <tr>
        <td>4</td>
        <td>Phone Number</td>
        <td>{adminData.phonumber}</td>
      </tr>
    </tbody>
  </Table>
        </>);
}
 
export default AdminDetails;
