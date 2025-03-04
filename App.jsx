import { useState } from "react";
import "./App.css"; 
import { Link } from "react-router-dom"; 

function App() {
  const [selectedName, setSelectedName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedChurch, setSelectedChurch] =   useState("");
  const [assignedVolunteers, setAssignedVolunteers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
      const [close,setClose]=useState(true);
      const show = () => {
        setIsVisible(!isVisible); // Toggle sidebar visibility
      };

  const nameJson = [
    { 
      "name": "Jeba", 
      "availability": { 
        "status": "Available", 
        "dates": ["02/11/2025", "16/11/2025"] 
      } 
    },
    { 
      "name": "Christy", 
      "availability": { 
        "status": "Not Available", 
        "dates": ["Not Available"] 
      } 
    },
    { 
      "name": "Ruth", 
      "availability": { 
        "status": "Available", 
        "dates": ["09/11/2025"] 
      } 
    },
    { 
      "name": "Ramaya", 
      "availability": { 
        "status": "Not Available", 
        "dates": ["Not Available"] 
      } 
    },
    { 
      "name": "Kevin", 
      "availability": { 
        "status": "Available", 
        "dates": ["23/11/2025"] 
      } 
    },
    { 
      "name": "Jerish", 
      "availability": { 
        "status": "Not Available", 
        "dates": ["Not Available"] 
      } 
    },
    { 
      "name": "Williams", 
      "availability": { 
        "status": "Available", 
        "dates": ["30/11/2025"] 
      } 
    },
    { 
      "name": "Godston", 
      "availability": { 
        "status": "Not Available", 
        "dates": ["Not Available"] 
      } 
    },
    { 
      "name": "Oswald", 
      "availability": { 
        "status": "Available", 
        "dates": ["02/11/2025", "30/11/2025"] 
      } 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedName && selectedRole && selectedDate && selectedChurch) {
      setAssignedVolunteers((prevVolunteers) =>
        prevVolunteers.concat({
          name: selectedName,
          role: selectedRole,
          date: selectedDate,
          church: selectedChurch
        })
      );
      setSelectedName("");
      setSelectedRole("");
      setSelectedDate("");
      setSelectedChurch("");
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  // Get selected person's available dates
  const selectedPerson = nameJson.find(person => person.name === selectedName);
  const availableDates = selectedPerson ? selectedPerson.availability.dates : [];

  return (
    <>
    <nav className="navBarApp">
        <div className="logo">
          <img src="./logo.png" alt="" id="logo" />
          <h1 id="name">Scripture Union</h1>
        </div>
        <button className="menu-toggle" onClick={show}> ☰</button>
        
          <ul id="list">
            <li>Volunteer List</li>
            <li>Lorem ipm</li>
            <li>
              <Link to={'/Event Scheduling'} style={{textDecoration:'none',color:'inherit'}}>Event Scheduling</Link>
            </li>
            <li>Lorem, ipsum.</li>
          </ul>
    
        <button className="logBtn">
          <Link to={'/Login'} style={{textDecoration:'none',color:'inherit'}}>Logout</Link>
        </button>
      </nav>
      <div className="sideBarApp"  style={{ display: isVisible ? "flex" : "none" }}>
    <ul id="list">
            <h1 id="close" onClick={show}>X</h1>
            <li>
              <Link to={'/Home'} style={{textDecoration:'none',color:'inherit'}}>Home</Link>
            </li>
            <li>Volunteer List</li>
            <li>Lorem ipm</li>
            <li>Lorem, ipsum.</li>
          </ul>
    
        <button className="logBtnSideBar">
          <Link to={'/Login'} style={{textDecoration:'none',color:'inherit'}}>Logout</Link> </button>
    </div>
      <div className="inner">
        <h1>Assign the Role to your volunteer</h1>

        <label htmlFor="Name">Select the name</label>
        <select name="Name" id="Name" value={selectedName} onChange={(e) => setSelectedName(e.target.value)} >
          <option value="">Select The Name</option>
          {nameJson
            .filter(person => person.availability.status === "Available") // Show only available volunteers
            .map((person, i) => (
              <option key={i} value={person.name}>{person.name}</option>
            ))}
        </select>
        <br />
        <br />

        <label htmlFor="Role" id="label">Select their Role</label>
        <select name="Role" id="Role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="" id="opt">Select their Role</option>
          <option value="Media" id="opt">Media</option>
          <option value="Puppet" id="opt">Puppet</option>
          <option value="MC" id="opt">MC</option>
          <option value="Action Song" id="opt">Action Song</option>
          <option value="Skit" id="opt">Skit</option>
          <option value="Team Leader" id="opt">Team Leader</option>
        </select>

        <br />
        <br />
        <label htmlFor="Date" id="label">Select the date</label>
        <select name="Date" id="Date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">Select the date</option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="Church" id="label">Select the Church</label>
        <select name="Church" id="Church" value={selectedChurch} onChange={(e) => setSelectedChurch(e.target.value)}>
          <option value="" id="opt">Select the church</option>
          <option value="CSI Trinity Church Avadi" id="opt">CSI Trinity Church, Avadi</option>
          <option value="St. John's CSI Church" id="opt">St. John's CSI Church, Avadi</option>
          <option value="CSI Wesley Church, Poonamallee" id="opt">CSI Wesley Church, Poonamallee</option>
          <option value="CSI Church, Karayanchavadi" id="opt">CSI Church, Karayanchavadi</option>
          <option value="CSI Peters Church, Thirumullaivoyal" id="opt">CSI Peters Church, Thirumullaivoyal</option>
        </select>

        <br />
        <br />
        <button type="button" id="submitBtn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

    
      <h2 id="hed2">Assigned Volunteers</h2>
      <table border="1" className="table">
        <thead id="head">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date</th>
            <th>Church</th>
          </tr>
        </thead>
        <tbody id="body">
          {assignedVolunteers.map((volunteer, i) => (
            <tr key={i}>
              <td>{volunteer.name}</td>
              <td>{volunteer.role}</td>
              <td>{volunteer.date}</td>
              <td>{volunteer.church}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </>
  );
}

export default App;
