import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { FaBars, FaBell, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear any stored authentication data
		localStorage.removeItem("authToken");
		localStorage.removeItem("adminUser");

		// Navigate to home page
		navigate("/");
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
