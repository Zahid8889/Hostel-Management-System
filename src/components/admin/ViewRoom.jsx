import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
const ViewRoom = (props) => {
  const [rooms, setrooms] = useState([]);
  
  
    console.log(props.adminid)
  const fetchRooms = async () => {
    await fetch("http://localhost:5000/api/adminpage/viewrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ adminid: props.adminid }),
    }).then(async (res) => {
      console.log('y')
      let response = await res.json();
      console.log(response);
      await setrooms(response.data);
      // await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  
    return (  <>
     {rooms.length!==0?(
      <Table striped bordered className="table-info">
        <thead className="table-dark">
          <tr>
            <th>Room Number</th>
            <th>Capacity</th>
         </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr>
              <td>{room.roomNumber}</td>
              <td>{room.capacity}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
      ):<>
        <h2 id="datanotfound">No Data Found</h2>
      </>}

    
    </>);
}
 
export default ViewRoom;