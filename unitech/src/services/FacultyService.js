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
