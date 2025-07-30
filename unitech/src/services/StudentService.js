import ApiService from "./ApiService";

class StudentService {
	// Get all students with filtering and pagination
	static async getStudents(params = {}) {
		try {
			const queryParams = new URLSearchParams(params).toString();
			const response = await ApiService.get(`/students?${queryParams}`);
			return response;
		} catch (error) {
			console.error("Error fetching students:", error);
			throw error;
		}
	}

	// Get student by ID
	static async getStudentById(id) {
		try {
			const response = await ApiService.get(`/students/${id}`);
			return response;
		} catch (error) {
			console.error("Error fetching student:", error);
			throw error;
		}
	}

	// Create new student
	static async createStudent(studentData) {
		try {
			const response = await ApiService.post("/students", studentData);
			return response;
		} catch (error) {
			console.error("Error creating student:", error);
			throw error;
		}
	}

	// Update student
	static async updateStudent(id, studentData) {
		try {
			const response = await ApiService.put(`/students/${id}`, studentData);
			return response;
		} catch (error) {
			console.error("Error updating student:", error);
			throw error;
		}
	}

	// Delete student
	static async deleteStudent(id) {
		try {
			const response = await ApiService.delete(`/students/${id}`);
			return response;
		} catch (error) {
			console.error("Error deleting student:", error);
			throw error;
		}
	}

	// Bulk delete students
	static async bulkDeleteStudents(ids) {
		try {
			const response = await ApiService.delete("/students", { ids });
			return response;
		} catch (error) {
			console.error("Error bulk deleting students:", error);
			throw error;
		}
	}

	// Get student statistics
	static async getStudentStatistics() {
		try {
			const response = await ApiService.get("/students/statistics");
			return response;
		} catch (error) {
			console.error("Error fetching student statistics:", error);
			throw error;
		}
	}

	// Get all programs
	static async getPrograms() {
		try {
			const response = await ApiService.get("/students/programs");
			return response;
		} catch (error) {
			console.error("Error fetching programs:", error);
			throw error;
		}
	}

	// Update student status
	static async updateStudentStatus(id, status) {
		try {
			const response = await ApiService.patch(`/students/${id}/status`, {
				status,
			});
			return response;
		} catch (error) {
			console.error("Error updating student status:", error);
			throw error;
		}
	}

	// Update student GPA
	static async updateStudentGPA(id, gpaData) {
		try {
			const response = await ApiService.patch(`/students/${id}/gpa`, gpaData);
			return response;
		} catch (error) {
			console.error("Error updating student GPA:", error);
			throw error;
		}
	}

	// Toggle featured status
	static async toggleFeatured(id) {
		try {
			const response = await ApiService.patch(
				`/students/${id}/toggle-featured`
			);
			return response;
		} catch (error) {
			console.error("Error toggling featured status:", error);
			throw error;
		}
	}

	// Get featured students
	static async getFeaturedStudents() {
		try {
			const response = await ApiService.get("/students/featured");
			return response;
		} catch (error) {
			console.error("Error fetching featured students:", error);
			throw error;
		}
	}

	// Utility methods
	static formatStudentData(formData) {
		return {
			...formData,
			gpa: formData.gpa ? parseFloat(formData.gpa) : 0,
			totalCredits: formData.totalCredits ? parseInt(formData.totalCredits) : 0,
			completedCredits: formData.completedCredits
				? parseInt(formData.completedCredits)
				: 0,
			scholarshipAmount: formData.scholarshipAmount
				? parseFloat(formData.scholarshipAmount)
				: 0,
		};
	}

	static validateStudentData(studentData) {
		const errors = {};

		if (!studentData.firstName?.trim()) {
			errors.firstName = "First name is required";
		}

		if (!studentData.lastName?.trim()) {
			errors.lastName = "Last name is required";
		}

		if (!studentData.email?.trim()) {
			errors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentData.email)) {
			errors.email = "Invalid email format";
		}

		if (!studentData.program?.trim()) {
			errors.program = "Program is required";
		}

		if (!studentData.year) {
			errors.year = "Year is required";
		}

		if (!studentData.enrollmentDate) {
			errors.enrollmentDate = "Enrollment date is required";
		}

		if (!studentData.dateOfBirth) {
			errors.dateOfBirth = "Date of birth is required";
		}

		if (studentData.gpa && (studentData.gpa < 0 || studentData.gpa > 4)) {
			errors.gpa = "GPA must be between 0 and 4";
		}

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	}
}

export default StudentService;
