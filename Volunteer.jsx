import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Volunteer.css';

function Volunteer() {
    const [isVisible, setIsVisible] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [volunteer, setVolunteer] = useState({
        volId: "",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: ""
    });
    const [volunteers, setVolunteers] = useState([]);
    const [updVolunteer, setUpdVolunteer] = useState({
        volId: "",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: ""
    });
    const [delVolunteer, setDelVolunteer] = useState({
        volId :"",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: ""
    });

    const toggleSidebar = () => setIsVisible(!isVisible);
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVolunteer((prev) => ({
            ...prev,
            [name]: value
        }));

        setUpdVolunteer((prev) => ({
            ...prev,
            [name]: value
        }));

        
        setDelVolunteer((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // Fetch volunteers from MongoDB
    const fetchVolunteers = async () => {
        try {
            const response = await axios.get("http://localhost:3006/get-volunteers");
            console.log("API Response:", response.data);
            const fetchedVolunteers = response.data ;
            setVolunteers(fetchedVolunteers);
        } catch (error) {
            console.error("Error fetching volunteers:", error);
            setVolunteers([]);
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3006/add-volunteer", volunteer);
            alert(response.data.message);
            setVolunteer({ volId:"",firstName: "", lastName: "", dob: "", email: "", password: "" });
            closeForm();
            fetchVolunteers(); 
        } catch (error) {
            console.error("Error adding volunteer:", error);
            alert("Failed to add volunteer");
        }
    };

    const handleFindVolunteer = async () => {
        if (!updVolunteer.volId) {
            alert("Please enter a Volunteer ID");
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:3006/get-volunteer/${updVolunteer.volId}`);
    
            console.log("Response from server:", response.data);
    
            if (response.data.volunteer) {
                setUpdVolunteer(response.data.volunteer);
            } else {
                alert("Volunteer not found");
            }
        } catch (error) {
            console.error("Error fetching volunteer:", error);
    
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
            
            alert("Failed to fetch volunteer");
        }
    };
    const handleUpdateVolunteer = async () => {
        if (!updVolunteer.volId) {
            alert("Please enter a Volunteer ID");
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:3006/update-volunteer/${updVolunteer.volId}`,
                {
                    firstName: updVolunteer.firstName,
                    lastName: updVolunteer.lastName,
                    dob: updVolunteer.dob,
                    email: updVolunteer.email,
                    password: updVolunteer.password
                }
            );
    
            alert(response.data.message);
            setUpdVolunteer({ volId:"",firstName: "", lastName: "", dob: "", email: "", password: "" });
           document.querySelector(".UpdVol").style.display = "none";
            fetchVolunteers(); 
           
        } catch (error) {
            console.error("Error updating volunteer:", error);
            alert("Failed to update volunteer");
        }
    };

    const handleDelFindVolunteer = async () => {
        if (!delVolunteer.volId) {
            alert("Please enter a Volunteer ID");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3006/get-volunteer/${delVolunteer.volId}`);

            if (response.data.volunteer) {
                setDelVolunteer(response.data.volunteer);
            } else {
                alert("Volunteer not found");
            }
        } catch (error) {
            console.error("Error fetching volunteer:", error);
            alert("Failed to fetch volunteer");
        }
    };

   
    const handleDeleteVolunteer = async () => {
        if (!delVolunteer.volId) {
            alert("Please enter a valid Volunteer ID");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:3006/delete-volunteer", { volId: delVolunteer.volId });
    
            alert(response.data.message);
            setDelVolunteer({ volId: "", firstName: "", lastName: "", dob: "", email: "", password: "" });
    
            fetchVolunteers(); 
        } catch (error) {
            console.error("Error deleting volunteer:", error);
            alert(error.response?.data?.message || "Failed to delete volunteer");
        }
    };
    
    
    function closeForms() {
        document.querySelector(".UpdVol").style.display = "none";
        document.querySelector(".delVol").style.display = "none";
    }
    function openForms(){
        document.querySelector(".UpdVol").style.display = "block";
       
    }
    function openDelForm(){
        document.querySelector(".delVol").style.display = "block";}
    
    
    useEffect(() => {
        fetchVolunteers();
    }, []);


    return (
        <>
            <nav id="navbar">
                <div className="logo">
                    <img src="./logo.png" alt="Logo" id="logo" />
                    <h1 id="name">Scripture Union</h1>
                </div>
                <button onClick={openForm}>Add</button>
                <button onClick={openForms}>Update</button>
                <button onClick={openDelForm}>Delete</button>
                <button className="menu-toggle-Vol" onClick={toggleSidebar}>☰</button>
            </nav>

      
            <div className="sideBarVol" style={{ display: isVisible ? "flex" : "none" }}>
                <ul id="list">
                    <h1 id="close" onClick={toggleSidebar}>X</h1>
                    <li><Link to={'/Home'}>Home</Link></li>
                    <li>Lorem ipsum</li>
                    <li><Link to={'/Event Scheduling'}>Event Scheduling</Link></li>
                    <li>Lorem ipsum</li>
                </ul>
            </div>

            {isFormOpen && (
                <div className="AddVol">
                    <button id='CloseVol' onClick={closeForm}>X</button>
                    <form id='VolForm' onSubmit={handleSubmit}>
                    <input type="text" id='VolDet' name="volId" placeholder='Enter Volunteer ID' value={volunteer.volId} onChange={handleChange} required />
                    <input type="text" id='VolDet' name="firstName" placeholder='Enter First Name' value={volunteer.firstName} onChange={handleChange} required />
                        <input type="text" id='VolDet' name="lastName" placeholder='Enter Last Name' value={volunteer.lastName} onChange={handleChange} required />
                        <input type="date" id='VolDet' name="dob" value={volunteer.dob} onChange={handleChange} required />
                        <input type="email" id='VolDet' name="email" placeholder='Enter Email' value={volunteer.email} onChange={handleChange} required />
                        <input type="password" id='VolDet' name="password" placeholder='Enter Password' value={volunteer.password} onChange={handleChange} required />
                        <button id='AddVolBtn' type="submit">Add</button></form>
                </div>
            )}

            <div className="UpdVol">
            <button id='CloseVol' onClick={closeForms}>X</button>
                <form action="">
                <input
    type="text"
    name="volId"
    id="VolDet"
    placeholder="Enter Volunteer ID"
    value={updVolunteer.volId}
    onChange={handleChange} 
/>

            <button type="button" onClick={handleFindVolunteer}>Find</button>

            <input type="text" name="firstName" id="VolDet" value={updVolunteer.firstName} onChange={handleChange} />
            <input type="text" name="lastName" id="VolDet" value={updVolunteer.lastName} onChange={handleChange} />
            <input type="date" name="dob" id="VolDet" value={updVolunteer.dob} onChange={handleChange} />
            <input type="email" name="email" id="VolDet" value={updVolunteer.email} onChange={handleChange} />
            <input type="text" name="password" id="VolDet" value={updVolunteer.password} onChange={handleChange} />
            <button id="UpdVolBtn" onClick={handleUpdateVolunteer}>Update</button>
                </form>
            </div>
         <div className="delVol">
            <button id='CloseVol' onClick={closeForms}>X</button>
            <form action="">
            <input
                type="text"
                name="volId"
                id="VolDet"
                placeholder="Enter Volunteer ID"
                value={delVolunteer.volId}
                onChange={handleChange}
            />
            <button type="button" onClick={handleDelFindVolunteer}>Find</button>


            <h3>Volunteer Details</h3>
                    <h4>ID: {delVolunteer.volId}</h4>
                    <h4>First Name: {delVolunteer.firstName}</h4>
                    <h4>Last Name: {delVolunteer.lastName}</h4>
                    <h4>DOB: {delVolunteer.dob}</h4>
                    <h4>Email: {delVolunteer.email}</h4>
                    <h4>Password: {delVolunteer.password}</h4>
                    <button type='button' id="DelVolBtn" onClick={handleDeleteVolunteer}>Delete</button>

            </form>
        

         </div>
            <div className="TableVol">
                <table id='VolTable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.length > 0 ? (
                            volunteers.map((vol, index) => (
                                <tr key={index}>
                                    <td>{vol.volId || "N/A"}</td>
                                    <td>{vol.firstName || "N/A"}</td>
                                    <td>{vol.lastName || "N/A"}</td>
                                    <td>{vol.dob ? new Date(vol.dob).toLocaleDateString() : "N/A"}</td>
                                    <td>{vol.email || "N/A"}</td>
                                    <td>{vol.password || "N/A"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>No volunteers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Volunteer;
