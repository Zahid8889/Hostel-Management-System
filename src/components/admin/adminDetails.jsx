import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
class adminDetails extends Component {
    state = {  } 
    render() { 
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
          <tr>
            <td>4</td>
            <td>Hostel No.</td>
            <td>{adminData.hostelno}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Phone Number</td>
            <td>{adminData.phonumber}</td>
          </tr>
        </tbody>
      </Table>
            </>);
    }
}
 
export default adminDetails;