import { useContext } from "react";
import { FacultyContext } from "../contexts/FacultyContext";

// Custom hook to use faculty context
export const useFaculty = () => {
	const context = useContext(FacultyContext);
	if (!context) {
		throw new Error("useFaculty must be used within a FacultyProvider");
	}
	return context;
};

export default useFaculty;
