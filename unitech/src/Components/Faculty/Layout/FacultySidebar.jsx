import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
      <h4 className="text-center mb-4">Faculty Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/courses">Courses</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/students">Students</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
