import React, { Component } from 'react';
import { useState,useEffect } from 'react';
import { Table,Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const ViewOneRoom = (props) => {
    let navigate=useNavigate();
  const [credentials, setCredentials] = useState({allotedsession:"" });
  const[data,setdata]=useState([]);
  
  
    
  const handleSubmit = async (e) => {
e.preventDefault();
    const response =  await fetch("http://localhost:5000/api/adminpage/roomdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ adminid: props.adminid,allottedsession:credentials.allotedsession }),
    });
    const json = await response.json();
          console.log(json);
          if (json.success) {
            //save the auth toke to local storage and redirect
            
            // localStorage.setItem("hostelno", json.hostelno);
            await setdata(json.data);
            console.log(json.data);
         
            alert('Room Fetched');
            
          } else {
            console.log("error");
            alert("Enter Valid Credentials");
          }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  
    return (  <>
      <Form className="form" onSubmit={handleSubmit}>
            <h2>View Room</h2>
            <Form.Group className="input" contorlId="formallotedsession">
              <Form.Label>Enter Alloted Session</Form.Label>
              <Form.Control
                type="string"
                placeholder="Enter Alloted Session"
                name="allotedsession"
                value={credentials.allotedsession}
                onChange={onChange}
              />
            </Form.Group>
            <Button type="submit" variant="secondary">
          Submit
        </Button>
            </Form>

            <Table striped bordered className="table-success">
    <thead className="table-dark">
      <tr>
        <th>Room Number</th>
        <th>Students</th>
        
      </tr>
    </thead>
    <tbody>
      
      {/* {data.map(room=>(
        <tr>
        
        <td>{room.roomNumber}</td>
        <td>{room.studentsInRoom}</td>
      </tr>




      ))
      } */}
      {data.map(room => (
  <tr key={room.roomNumber}> {/* Remember to add a unique key for each item in the list */}
    <td>{room.roomNumber}</td>
    {room.studentsInRoom.map(student=>(<td>{student.studentid.name}</td>))}
  </tr>
))}
      
    </tbody>
  </Table>
    
    </>);
}
 
export default ViewOneRoom;