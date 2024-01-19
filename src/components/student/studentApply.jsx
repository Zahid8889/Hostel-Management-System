import React, { Component } from 'react';
class studentApply extends Component {
    state = {  } 
    render() { 
        return (
            <>
            <Form className="form" onSubmit={handleSubmit}>
        <h2>Apply For Hostel</h2>
  
       
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter Hostel No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Hostel Number"
            name="hostelno"
            value={credentials.hostelno}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="input" controlId="formPassword">
          <Form.Label>Enter UTR No.</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter UTR Number"
            name="hostelno"
            value={credentials.hostelno}
            onChange={onChange}
          />
        </Form.Group>
        <hr />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
            </>
        );
    }
}
 
export default studentApply;