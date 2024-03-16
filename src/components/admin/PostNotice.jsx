import React, { Component } from 'react';
import { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
const PostNotice = () => {
    const [credentials, setCredentials] = useState({
     

        message:""
    
      });
    
      const onChange = (event) => {
        setCredentials({
          ...credentials,
          [event.target.name]: event.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(JSON.stringify({ designation: credentials.designation, name: credentials.name, email: credentials.email, password: credentials.password }))
        const response = await fetch("http://localhost:5000/api/adminpage/notice/postnotice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
         
            
          },
          credentials: 'include',
          body: JSON.stringify({
           
    

            message:credentials.message,
            
          }),
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
          alert("Enter valid Credentials ");
        
        }
        else
        {
          alert("Notice Sent")
           
        
        }
      };
    return (<>
    <Form className="form" onSubmit={handleSubmit}>
        <h2>Add Notice</h2>
  

        <Form.Group className="input" controlId="formmessage">
          <Form.Label>Enter Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Message"
            name="message"
            value={credentials.message}
            onChange={onChange}
          />
        </Form.Group>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
        </Form>



    </>  );
}
 
export default PostNotice;