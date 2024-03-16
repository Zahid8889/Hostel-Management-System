import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ViewNotices = () => {

  const dateString = "2001-09-20T00:00:00.000+00:00";
const date = new Date(dateString);
console.log(date);




    const [studentNotice, setstudentNotice] = useState([]);
    const fetchNotice = async () => {
        // const email = localStorage.getItem("userEmail");
        await fetch("http://localhost:5000/api/studentpage/getnotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({}),
        }).then(async (res) => {
        
          let response = await res.json();
          console.log(response);
          console.log("hep")
          
          await setstudentNotice(response.data);
        });
      };
      useEffect(() => {
        fetchNotice();
      }, []);

    
  
    return ( <>

    {studentNotice.length==0?<h2>No Notices</h2>:<> 
    <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Message</th>
    <th>Date</th>
   
  
  </tr>
</thead>
<tbody>
  {studentNotice.map(notice=>
  
    <tr>
    <th>{notice.message}</th>
    <th>{Date(notice.date)}</th>
    {/* <th>{notice.date.getFullYear()+'/'+notice.date.month+'/'+notice.date.date}</th> */}
    {/* <th>{`${notice.date.getFullYear()}/notice.date.monthnotice.date.date`}</th> */}
  
    
    


  </tr>
   
    )}
</tbody>
  </Table>
    
    </>}


    

    </> );
}
 
export default ViewNotices;