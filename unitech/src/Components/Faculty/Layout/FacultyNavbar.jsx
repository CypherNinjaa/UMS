import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";

function FacultyNavbar() {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<Navbar bg="primary" variant="dark" expand="lg" className="px-4">
			<Navbar.Brand href="/faculty-dashboard">Faculty Portal</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				{/* <Nav className="me-auto">
					<Nav.Link href="/faculty-dashboard">Dashboard</Nav.Link>
					<Nav.Link href="/faculty/courses">My Courses</Nav.Link>
					<Nav.Link href="/faculty/students">Students</Nav.Link>
				</Nav> */}
				<Nav>
					<Dropdown align="end">
						<Dropdown.Toggle variant="outline-light" id="dropdown-basic">
							{user?.name || "Faculty User"}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item href="/faculty/profile">Profile</Dropdown.Item>
							<Dropdown.Item href="/faculty/settings">Settings</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default FacultyNavbar;
