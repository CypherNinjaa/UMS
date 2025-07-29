import React from "react";
import FacultyNavbar from "./FacultyNavbar";
import FacultySidebar from "./FacultySidebar";
import "./FacultyLayout.css";

function FacultyLayout({ children }) {
	return (
		<div className="faculty-layout">
			<FacultyNavbar />
			<div className="faculty-content d-flex">
				<FacultySidebar />
				<div className="faculty-main-content p-4">{children}</div>
			</div>
		</div>
	);
}

export default FacultyLayout;
