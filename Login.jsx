import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isStaffActive, setIsStaffActive] = useState(true);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsStaffActive(!isStaffActive);
  };

  const handleStaffLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3006/login", {
        email: staffEmail,
        password: staffPassword,
      });

      if (response.status === 200) {
        setError("");
        navigate("/Home"); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className={`outerLogin ${isStaffActive ? "staff-active" : ""}`}>
      <div className="innerLogin" style={{ transform: isStaffActive ? "translateX(0%)" : "translateX(-50%)" }}>


        <div className="staffLogin">
          <div className="leftStaff">
            <h1>Login</h1>
            <h3>Welcome!!! Staff</h3>
            <input 
              type="email" 
              id="staffID" 
              placeholder="Enter your email id" 
              value={staffEmail} 
              onChange={(e) => setStaffEmail(e.target.value)} 
            />
            <input 
              type="password" 
              id="staffPass" 
              placeholder="Enter your Password" 
              value={staffPassword} 
              onChange={(e) => setStaffPassword(e.target.value)} 
            />
            <button onClick={handleStaffLogin}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if invalid login */}
            <div className="cont2">
              <p>Are you a volunteer? Click the button below</p>
              <button onClick={toggleLogin} className="staffSlider">Switch to Volunteer</button>
            </div>
          </div>
          <div className="rightStaff"></div>
        </div>

   
        <div className="volLogin">
          <div className="leftVol">
            <div className="cont"></div>
          </div>
          <div className="rightVol">
            <h1>Login</h1>
            <h2>Welcome!!! Volunteer</h2>
            <input type="email" id="volID" placeholder="Enter your email id" />
            <input type="password" id="volPass" placeholder="Enter your Password" />
            <button>Login</button>
            <div className="transfer">
              <p>Are you Staff? Click the button below</p>
              <button onClick={toggleLogin} className="volSlider">Switch to Staff</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
