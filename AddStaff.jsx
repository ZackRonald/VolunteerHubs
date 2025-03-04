import React from 'react';
import './AddStaff.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

function AddStaff() {
     const [menuOpen, setMenuOpen] = useState(false);
        
            const [isVisible, setIsVisible] = useState(false);
            const [close,setClose]=useState(true);
            const show = () => {
              setIsVisible(!isVisible);
            };

            const [staff, setStaff] = useState({
              staffName: "",
              staffId: "",
              staffPhone: "",
              staffAddress: "",
              staffEmail: "",
              staffPassword: ""
          });

          const handleChange = (e) => {
            setStaff({ ...staff, [e.target.name]: e.target.value });
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post("http://localhost:3006/add-staff", staff);
                alert(response.data.message);
                setStaff({ staffName: "", staffId: "", staffPhone: "", staffAddress: "", staffEmail: "", staffPassword: "" });
            } catch (error) {
                console.error("Error:", error);
                alert("Failed to add staff");
            }
        };
  return (
  <>
  <div id='navbar'>
        <div className="logo">
          <img src="./logo.png" alt="" id="logo" />
          <h1 id="name">Scripture Union</h1>
        </div>
            <ul id='list'>
                <li > <Link to={'/'} style={{textDecoration:'none',color:'inherit'}}>Admin</Link></li>
                <li>Staff Detials</li>
                <li>Setting</li>
                <li>View Staff</li>
            </ul>
            <button className="menu-toggle" onClick={show}> ☰</button>
        
        </div>
        <div className="sideBar" style={{ display: isVisible ? "flex" : "none" }}>
            <ul id="list">
                    <h1 id="close" onClick={show}>X</h1>
                    <li> <Link to={'/AddStaff'} style={{textDecoration:'none',color:'inherit'}}>Add Staff</Link></li>
                    <li>Staff Detials</li>
                    <li>
                     Settings
                    </li>
                    <li>View Sttaff</li>
                  </ul>
            
                <button className="logBtnSideBar">
                  <Link to={'/Login'} style={{textDecoration:'none',color:'inherit'}}>Logout</Link> </button>
            </div>
       
            <div className='Staffs'>
              <h1>Add Your Staff</h1>
            <form onSubmit={handleSubmit}>
                    <input className='StaffDetials' type="text" name="staffName" placeholder="Enter the staff name" value={staff.staffName} onChange={handleChange} required /> 
                    <input className='StaffDetials' type="text" name="staffId" placeholder="Enter the staff ID" value={staff.staffId} onChange={handleChange} required /> <br />
                    <input className='StaffDetials' type="text" name="staffPhone" placeholder="Enter the staff phone number" value={staff.staffPhone} onChange={handleChange} required /> 
                    <input className='StaffDetials' type="text" name="staffAddress" placeholder="Enter the staff address" value={staff.staffAddress} onChange={handleChange} required /> <br />
                    <input className='StaffDetials' type="email" name="staffEmail" placeholder="Enter the staff email" value={staff.staffEmail} onChange={handleChange} required /> 
                    <input className='StaffDetials' type="password" name="staffPassword" placeholder="Enter the password" value={staff.staffPassword} onChange={handleChange} required /> <br />
                    <button id='AddStaffBtn' type="submit">Add</button>
                </form>
        </div> 
  </>
  )
}

export default AddStaff