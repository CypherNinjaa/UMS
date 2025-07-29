import { useContext } from "react";
import FacultyDashboardContext from "../contexts/FacultyDashboardContext";

// Custom hook to use the Faculty Dashboard context
export const useFacultyDashboard = () => {
	const context = useContext(FacultyDashboardContext);
	if (!context) {
		throw new Error(
			"useFacultyDashboard must be used within a FacultyDashboardProvider"
		);
	}
	return context;
};
