import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
class studentHostel extends Component {
    state = {  } 
    render() { 
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
        
        </>}
            </>
        );
    }
}
 
export default studentHostel;