import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
const ViewNotice = () => {
    const [adminNotice, setadminNotice] = useState([]);
    const fetchNotice = async () => {
        // const email = localStorage.getItem("userEmail");
        await fetch("http://localhost:5000/api/adminpage/notice/retrievenotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({}),
        }).then(async (res) => {
        
          let response = await res.json();
          console.log(response);
          
          await setadminNotice(response.data);
        });
      };
      useEffect(() => {
        fetchNotice();
      }, []);

    
  
    return ( <>

    {adminNotice.length==0?<h2>No Notices</h2>:<> 
    <Table striped bordered className="table-warning">
<thead className="table-dark">
  <tr>
    <th>Message</th>
   
  
  </tr>
</thead>
<tbody>
  {adminNotice.map(notice=>
  
    <tr>
    <th>{notice.message}</th>
  
    
    


  </tr>
   
    )}
</tbody>
  </Table>
    
    </>}


    

    </> );
}
 
export default ViewNotice;