import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Bit = () => {

let navigate=useNavigate();
    const handleSubmit=()=>
    {
        navigate("/adminpage/prac")
    }
    return ( <>
    <Button type="submit" onClick={handleSubmit}>Hello </Button></> );
}
 
export default Bit;