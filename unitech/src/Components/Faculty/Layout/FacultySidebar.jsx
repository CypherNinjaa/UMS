import React from "react";
import { Link } from "react-router-dom";
import "./FacultyLayout.css";

function FacultySidebar() {
	return (
		<div
			className="bg-dark text-white p-3 vh-100 faculty-sidebar"
			style={{ width: "250px" }}
		>
			<h4 className="text-center mb-4">Faculty Panel</h4>
			<ul className="nav flex-column">
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty-dashboard">
						Dashboard
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/courses">
						Courses
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/students">
						Students
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/grades">
						Grades
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/attendance">
						Attendance
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/profile">
						Profile
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link text-white" to="/faculty/settings">
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default FacultySidebar;
