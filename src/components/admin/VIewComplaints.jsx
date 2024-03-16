import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
const ViewComplaints = () => {
    const [adminComplaint, setadminComplaint] = useState([]);
    const fetchComplaint = async () => {
        // const email = localStorage.getItem("userEmail");
        await fetch("http://localhost:5000/api/adminpage/retrievecomplaint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({}),
        }).then(async (res) => {
          console.log('y')
          let response = await res.json();
          console.log(response);
          
          await setadminComplaint(response.data);
        });
      };
      useEffect(() => {
        fetchComplaint();
      }, []);

    return (  <>
    {adminComplaint.length==0?<h2>No Active Complaints</h2>:<> 
    <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Message</th>

  
  </tr>
</thead>
<tbody>
  {adminComplaint.map(complaint=>
  
    <tr>
    <th>{complaint.message}</th>
  
    
    


  </tr>
   
    )}
</tbody>
  </Table>
    
    </>}


    </>);
}
 
export default ViewComplaints;