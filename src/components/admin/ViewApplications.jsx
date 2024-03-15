import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Table,Button } from 'react-bootstrap';
const ViewApplications = () => {
    let location=useLocation();
    // console.log(location.state.data.receivedApplications[0]);

    const handleAccept = async (applicationid) => {
        console.log(applicationid)
    await fetch("http://localhost:5000/api/allotroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
      body: JSON.stringify({ applicationid:applicationid }),
    }).then(async (res) => {
      let response = await res.json();
      console.log(response)
      if (response.success) {
        console.log("success accepted");
  

      } else {
        
        alert("Aceepting error try again");
      }
    });
  };


    return (  <>
    {location.state.data.receivedApplications.length!==0?(
  <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Registration Number</th>
    <th>UTR No 1 </th>
    <th>UTR No 2</th>
    <th>Room Number</th>
    <th>Accept</th>
    <th>Reject</th>
  </tr>
</thead>
<tbody>
  {location.state.data.receivedApplications.map(student=>
    <tr>
      <th>{student.studentid.name}</th>
      <th>{student.utrno1}</th>
      <th>{student.utrno2}</th>
      <th>{student.dept}</th>
      <th><Button type="button" variant="success"  onClick={() => handleAccept(student._id)}>
          Accept
        </Button></th>
       <th> <Button type="button" variant="danger" className='success' onClick={() => handleAccept(student._id)}>
          Reject
        </Button></th>


    </tr>
    )}
</tbody>
  </Table>
    ):<>
    <h2 id="datanotfound">No data found</h2>
    
    </>}
    
    
    
    </>);
}
 
export default ViewApplications;