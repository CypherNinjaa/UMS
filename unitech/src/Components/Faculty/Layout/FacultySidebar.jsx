import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FaTachometerAlt,
	FaCalendarAlt,
	FaUsers,
	FaClock,
	FaClipboardCheck,
	FaBullhorn,
	FaUser,
	FaCog,
	FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import "./FacultyLayout.css";

function FacultySidebar() {
	const location = useLocation();
	const { user, logout } = useAuth();

	const menuItems = [
		{
			title: "Dashboard",
			path: "/facultydashboard#overview",
			icon: FaTachometerAlt,
		},
		{
			title: "Academic Calendar",
			path: "/facultydashboard#calendar",
			icon: FaCalendarAlt,
		},
		{
			title: "Students",
			path: "/facultydashboard#students",
			icon: FaUsers,
		},
		{
			title: "Class Schedule",
			path: "/facultydashboard#schedule",
			icon: FaClock,
		},
		{
			title: "Attendance",
			path: "/facultydashboard#attendance",
			icon: FaClipboardCheck,
		},
		{
			title: "Notices",
			path: "/facultydashboard#notices",
			icon: FaBullhorn,
		},
		{
			title: "My Profile",
			path: "/facultydashboard#profile",
			icon: FaUser,
		},
		{
			title: "Settings",
			path: "/faculty/settings",
			icon: FaCog,
		},
	];

	const handleTabNavigation = (path, event) => {
		if (path.includes("#")) {
			event.preventDefault();
			const tab = path.split("#")[1];
			// Trigger tab change in dashboard
			window.dispatchEvent(new CustomEvent("changeTab", { detail: tab }));
		}
	};

	return (
		<div className="faculty-sidebar bg-dark text-white">
			{/* Sidebar Header */}
			<div className="sidebar-header p-3 border-bottom border-secondary">
				<h5 className="mb-0 text-center">
					<FaTachometerAlt className="me-2" />
					Faculty Panel
				</h5>
			</div>

			{/* Navigation Menu */}
			<nav className="sidebar-nav p-2">
				<ul className="nav flex-column">
					{menuItems.map((item) => {
						const isActive =
							location.pathname === "/facultydashboard" &&
							(item.path === "/facultydashboard#overview" ||
								item.path.includes("#"));

						return (
							<li key={item.path} className="nav-item mb-1">
								<Link
									to={item.path}
									className={`nav-link d-flex align-items-center px-3 py-2 rounded ${
										isActive && item.path.includes("#")
											? "active"
											: "text-light"
									}`}
									onClick={(e) => handleTabNavigation(item.path, e)}
								>
									<item.icon className="me-3" size={18} />
									<span className="nav-text">{item.title}</span>
									{isActive && item.path.includes("#") && (
										<div className="ms-auto">
											<div className="active-indicator"></div>
										</div>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* User Profile Section */}
			<div className="sidebar-footer p-3 border-top border-secondary">
				<div className="d-flex align-items-center mb-2">
					<div className="user-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center me-2">
						<FaUser size={16} />
					</div>
					<div className="user-info">
						<div className="user-name text-light">
							{user?.name || "Faculty"}
						</div>
						<small className="text-muted">Faculty Member</small>
					</div>
				</div>
				<button className="btn btn-outline-light btn-sm w-100" onClick={logout}>
					<FaSignOutAlt className="me-2" size={12} />
					Logout
				</button>
			</div>
		</div>
	);
}

export default FacultySidebar;
