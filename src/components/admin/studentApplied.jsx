import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
const studentApplied = () => {
    return ( <>
         {studentapplied.length!==0?(
      <Table striped bordered className="table-info">
        <thead className="table-dark">
          <tr>
            <th>Registration Number</th>
            <th>Name</th>
            <th>Roll no</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {studentapplied.map((student) => (
            <tr>
              <td>{student.regnumber}</td>
              <td>{student.name}</td>
              <td>{student.rollnum}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAccept(student.regnumber)}
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  data-value="apply clicked"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleReject(student.regnumber)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      ):<>
        
      </>}
    </> );
}
 
export default studentApplied;