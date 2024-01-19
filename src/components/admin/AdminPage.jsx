import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../design/tabl.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AdminPage() {
  let navigate = useNavigate();
  const [adminData, setadminData] = useState({});
  const [studentData, setstudentData] = useState([]);
  const [studentapplied, setstudentapplied] = useState([]);

  const fetchAdmin = async () => {
    const email = localStorage.getItem("userEmail");
    await fetch("http://localhost:5000/api/adminpage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      let response = await res.json();
      await setadminData(response[0]);
      await setstudentData(response[1]);
    });
  };
  useEffect(() => {
    fetchAdmin();
  }, []);
  const fetchpplied = async () => {
    const hno = localStorage.getItem("hostelno");
    await fetch("http://localhost:5000/api/studentapplied", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostelno: hno }),
    }).then(async (res) => {
      let response = await res.json();
      await setstudentapplied(response);
      console.log("successf");
    });
  };
  useEffect(() => {
    fetchpplied();
  }, []);
  console.log(adminData, "Admin");
  console.log(studentData, "student");
  console.log(studentapplied, "studenta");

  const handleAccept = async (regno) => {
    await fetch("http://localhost:5000/api/studentaccept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regnumber: regno }),
    }).then(async (res) => {
      let response = await res.json();
      if (response.success) {
        console.log("success accepted");
        // navigate("/adminpage");
        let students=studentData;
        let student=studentapplied.filter(s=>s.regnumber==regno);
        students.push(student[0]);
        setstudentData(students);

        setstudentapplied((current) =>
        current.filter((fruit) => fruit.regnumber !== regno))

      } else {

        alert("Aceepting error try again");
      }
    });
  };
  const handleReject = async (regno) => {
    await fetch("http://localhost:5000/api/studentreject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ regnumber: regno }),
    }).then(async (res) => {
      let response = await res.json();
      if (response.success) {
        console.log("success rejected");
        // navigate("/adminpage");
        setstudentapplied((current) =>
        current.filter((fruit) => fruit.regnumber !== regno))
      } else {
        alert("Already rejected");
      }
    });
  };
  const handleData=()=>
  {
   let student=[];
    setstudentData(student);
  }
  const countData=()=>
  {
    let clas="btn btn-lg btn-danger btn-center";
    if(studentData.length==0)
    return clas+" disabled";
    else
    return clas;
  }
  

  return (
    <div className="tab">
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
      <div className="text-center m-4">
      <Button className={countData()} onClick={handleData}>Delete All</Button>
      </div>
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
    </div>
  );
}
