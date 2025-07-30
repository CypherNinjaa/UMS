import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
	FaTachometerAlt,
	FaUsers,
	FaGraduationCap,
	FaUserGraduate,
	FaNewspaper,
	FaImages,
	FaCog,
	FaChartBar,
	FaFileAlt,
	FaEnvelope
} from "react-icons/fa";

const AdminSidebar = ({ collapsed }) => {
	const location = useLocation();

	const menuItems = [
		{
			title: "Dashboard",
			path: "/admin",
			icon: FaTachometerAlt,
			exact: true,
		},
		{
			title: "Faculty Management",
			path: "/admin/faculty",
			icon: FaUsers,
		},
		{
			title: "Program Management",
			path: "/admin/programs",
			icon: FaGraduationCap,
		},
		{
			title: "Student Management",
			path: "/admin/students",
			icon: FaUserGraduate,
		},
		{
			title: "News & Events",
			path: "/admin/news",
			icon: FaNewspaper,
		},
		{
			title: "Contact Management",
			path: "/admin/contacts",
			icon: FaEnvelope,
		},
	];

	const isActive = (path, exact = false) => {
		if (exact) {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	return (
		<div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
			<div className="sidebar-content">
				<Nav className="flex-column">
					{menuItems.map((item, index) => {
						const IconComponent = item.icon;
						return (
							<Nav.Link
								key={index}
								as={Link}
								to={item.path}
								className={`sidebar-item ${
									isActive(item.path, item.exact) ? "active" : ""
								}`}
							>
								<IconComponent className="sidebar-icon" />
								{!collapsed && (
									<span className="sidebar-text">{item.title}</span>
								)}
							</Nav.Link>
						);
					})}
				</Nav>
			</div>
		</div>
	);
};

export default AdminSidebar;
