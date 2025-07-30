import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	return (
		<div className="admin-layout">
			<AdminNavbar toggleSidebar={toggleSidebar} />
			<div className="admin-content-wrapper">
				<AdminSidebar collapsed={sidebarCollapsed} />
				<main
					className={`admin-main-content ${sidebarCollapsed ? "expanded" : ""}`}
				>
					<Container fluid className="p-3">
						{children}
					</Container>
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
