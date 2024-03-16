import React, { Component } from 'react';
import { useEffect,useState } from 'react';
import { Table,Button } from 'react-bootstrap';
const  GetComplaint= () => {
    const [studentComplaint, setstudentComplaint] = useState([]);
    const fetchComplaint = async () => {
        // const email = localStorage.getItem("userEmail");
        await fetch("http://localhost:5000/api/studentpage/complaint/getcomplaint", {
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
          
          await setstudentComplaint(response.data);
        });
      };
      useEffect(() => {
        fetchComplaint();
      }, []);

      const handleResolve = async (complaintid) => {
        // console.log(applicationid)
    await fetch("http://localhost:5000/api/studentpage/complaint/resolvecomplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:'include',
      body: JSON.stringify({ complaintid:complaintid }),
    }).then(async (res) => {
      let response = await res.json();
      console.log(response)
      if (response.success) {
        console.log("success accepted");
        window. location. reload();
  

      } else {
        
        alert("Aceepting error try again");
      }
    });
  };
      console.log(studentComplaint.length)
    return ( <>

    {studentComplaint.length==0?<h2>No Active Complaints</h2>:<> 
    <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Message</th>
    <th>Resolved</th>
  
  </tr>
</thead>
<tbody>
  {studentComplaint.map(complaint=>
  
    <tr>
    <th>{complaint.message}</th>
   {complaint.resolved==false?<th><Button type="button" variant="success"  onClick={() => handleResolve(complaint._id)}>
       Resolved
      </Button></th>
    :<th>Resolved</th>}
    
    


  </tr>
   
    )}
</tbody>
  </Table>
    
    </>}


    

    </> );
}
 
export default GetComplaint ;