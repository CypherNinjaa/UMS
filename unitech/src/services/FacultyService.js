import ApiService from "./ApiService";

class FacultyService {
	// Get all faculty with optional filtering and pagination
	static async getAllFaculty(params = {}) {
		try {
			const response = await ApiService.get("/faculty", params);
			return response;
		} catch (error) {
			console.error("Error fetching faculty:", error);
			throw error;
		}
	}

	// Get faculty by ID
	static async getFacultyById(id) {
		try {
			const response = await ApiService.get(`/faculty/${id}`);
			return response;
		} catch (error) {
			console.error("Error fetching faculty by ID:", error);
			throw error;
		}
	}

	// Create new faculty member
	static async createFaculty(facultyData) {
		try {
			const response = await ApiService.post("/faculty", facultyData);
			return response;
		} catch (error) {
			console.error("Error creating faculty:", error);
			throw error;
		}
	}

	// Create faculty with login credentials
	static async createFacultyWithLogin(facultyData, loginData) {
		try {
			// First create the faculty member
			const facultyResponse = await ApiService.post("/faculty", facultyData);

			// If faculty creation is successful and login is requested, create user account
			if (facultyResponse && loginData && loginData.createLogin) {
				const userData = {
					name: facultyData.name,
					email: loginData.loginEmail,
					mobile_no: facultyData.phone,
					password: loginData.password,
					role: "faculty",
					faculty_id: facultyResponse.id, // Link to faculty record
				};

				try {
					await ApiService.post("/users", userData);
				} catch (userError) {
					console.error("Error creating user account:", userError);
					// Could add rollback logic here if needed
					throw new Error("Faculty created but login account creation failed");
				}
			}

			return facultyResponse;
		} catch (error) {
			console.error("Error creating faculty with login:", error);
			throw error;
		}
	}

	// Update faculty member
	static async updateFaculty(id, facultyData) {
		try {
			const response = await ApiService.put(`/faculty/${id}`, facultyData);
			return response;
		} catch (error) {
			console.error("Error updating faculty:", error);
			throw error;
		}
	}

	// Update faculty with login credentials
	static async updateFacultyWithLogin(id, facultyData, loginData) {
		try {
			// First update the faculty member
			const facultyResponse = await ApiService.put(
				`/faculty/${id}`,
				facultyData
			);

			// Handle login credentials if requested
			if (loginData && loginData.createLogin) {
				// Check if user already exists for this faculty
				try {
					const existingUser = await ApiService.get(`/users/faculty/${id}`);

					if (existingUser) {
						// Update existing user
						const userData = {
							name: facultyData.name,
							email: loginData.loginEmail,
							mobile_no: facultyData.phone,
							password: loginData.password,
						};
						await ApiService.put(`/users/${existingUser.user_id}`, userData);
					} else {
						// Create new user
						const userData = {
							name: facultyData.name,
							email: loginData.loginEmail,
							mobile_no: facultyData.phone,
							password: loginData.password,
							role: "faculty",
							faculty_id: id,
						};
						await ApiService.post("/users", userData);
					}
				} catch (userError) {
					console.error("Error handling user account:", userError);
					throw new Error("Faculty updated but login account update failed");
				}
			}

			return facultyResponse;
		} catch (error) {
			console.error("Error updating faculty with login:", error);
			throw error;
		}
	}

	// Delete faculty member
	static async deleteFaculty(id) {
		try {
			const response = await ApiService.delete(`/faculty/${id}`);
			return response;
		} catch (error) {
			console.error("Error deleting faculty:", error);
			throw error;
		}
	}

	// Bulk delete faculty members
	static async bulkDeleteFaculty(ids) {
		try {
			const response = await ApiService.delete("/faculty", { ids });
			return response;
		} catch (error) {
			console.error("Error bulk deleting faculty:", error);
			throw error;
		}
	}

	// Get faculty statistics
	static async getFacultyStatistics() {
		try {
			const response = await ApiService.get("/faculty/statistics");
			return response;
		} catch (error) {
			console.error("Error fetching faculty statistics:", error);
			throw error;
		}
	}

	// Get all departments
	static async getDepartments() {
		try {
			const response = await ApiService.get("/faculty/departments");
			return response;
		} catch (error) {
			console.error("Error fetching departments:", error);
			throw error;
		}
	}

	// Get featured faculty
	static async getFeaturedFaculty() {
		try {
			const response = await ApiService.get("/faculty/featured");
			return response;
		} catch (error) {
			console.error("Error fetching featured faculty:", error);
			throw error;
		}
	}

	// Toggle featured status
	static async toggleFeaturedStatus(id) {
		try {
			const response = await ApiService.patch(`/faculty/${id}/toggle-featured`);
			return response;
		} catch (error) {
			console.error("Error toggling featured status:", error);
			throw error;
		}
	}

	// Search faculty
	static async searchFaculty(searchTerm, filters = {}) {
		try {
			const params = {
				search: searchTerm,
				...filters,
			};
			const response = await ApiService.get("/faculty", params);
			return response;
		} catch (error) {
			console.error("Error searching faculty:", error);
			throw error;
		}
	}

	// Export faculty data
	static async exportFaculty(format = "csv", filters = {}) {
		try {
			// This would typically return a blob for file download
			const params = {
				...filters,
				export: format,
			};
			const response = await ApiService.get("/faculty", params);
			return response;
		} catch (error) {
			console.error("Error exporting faculty data:", error);
			throw error;
		}
	}

	// Import faculty data
	static async importFaculty(fileData) {
		try {
			const response = await ApiService.post("/faculty/import", fileData);
			return response;
		} catch (error) {
			console.error("Error importing faculty data:", error);
			throw error;
		}
	}
}

export default FacultyService;
