import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaBars, FaBell, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

const AdminNavbar = ({ toggleSidebar }) => {
	const handleLogout = () => {
		// Logout functionality to be implemented
		alert("Logout functionality to be implemented");
	};

	return (
		<Navbar bg="white" className="admin-navbar border-bottom px-3" fixed="top">
			<div className="d-flex align-items-center">
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={toggleSidebar}
					className="me-3 sidebar-toggle"
				>
					<FaBars />
				</Button>
				<Navbar.Brand className="fw-bold text-primary">
					Admin Dashboard
				</Navbar.Brand>
			</div>

			<Nav className="ms-auto d-flex align-items-center">
				{/* User Profile */}
				<Dropdown align="end">
					<Dropdown.Toggle variant="outline-primary" size="sm" id="user-menu">
						<FaUser className="me-2" />
						Admin User
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Header>Admin User</Dropdown.Header>
						<Dropdown.Item>
							<FaUser className="me-2" />
							Profile
						</Dropdown.Item>
						<Dropdown.Item>
							<FaCog className="me-2" />
							Settings
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item onClick={handleLogout}>
							<FaSignOutAlt className="me-2" />
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default AdminNavbar;
