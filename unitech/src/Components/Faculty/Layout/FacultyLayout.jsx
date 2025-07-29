import React from "react";
import { Container } from "react-bootstrap";
import FacultyNavbar from "./FacultyNavbar";
import FacultySidebar from "./FacultySidebar";
import "./FacultyLayout.css";

function FacultyLayout({ children }) {
	return (
		<div className="faculty-layout">
			<FacultyNavbar />
			<div className="faculty-content d-flex">
				<FacultySidebar />
				<Container fluid className="faculty-main-content p-4">
					{children}
				</Container>
			</div>
		</div>
	);
}

export default FacultyLayout;
