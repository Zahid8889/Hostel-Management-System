import React, { Component } from "react";
import "./foot.css";

const Footer = () => {
  return (
    <div className="container-fluid footer">
      <div className="row">
        <div className="col col1">
          BIT Sindri, The Premier Engineering College of Jharkhand, Department
          of Higher Technical Education, Government of Jharkhand.
          <a href="https://www.bitsindri.ac.in" target="_blank">
            BIT Sindri Official Website
          </a>
        </div>
        <div className="col col2">
          <ul>
            <li> A-Zone</li>
            <li>B-Zone</li>
            <li>Girls Hostels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
