const Faculty = require("../models/Faculty");
const { Op } = require("sequelize");

class FacultyController {
	// Get all faculty with pagination, search, and filtering
	static async getAllFaculty(req, res) {
		try {
			const {
				page = 1,
				limit = 10,
				search = "",
				department = "",
				status = "",
				featured = "",
				sortBy = "name",
				sortOrder = "ASC",
			} = req.query;

			const offset = (parseInt(page) - 1) * parseInt(limit);

			// Build where clause
			const whereClause = {};

			if (search) {
				whereClause[Op.or] = [
					{ name: { [Op.like]: `%${search}%` } },
					{ email: { [Op.like]: `%${search}%` } },
					{ department: { [Op.like]: `%${search}%` } },
					{ specialization: { [Op.like]: `%${search}%` } },
				];
			}

			if (department && department !== "All") {
				whereClause.department = department;
			}

			if (status && status !== "All") {
				whereClause.status = status;
			}

			if (featured !== "") {
				whereClause.featured = featured === "true";
			}

			whereClause.isActive = true;

			// Valid sort fields
			const validSortFields = [
				"name",
				"email",
				"department",
				"joinDate",
				"createdAt",
			];
			const sortField = validSortFields.includes(sortBy) ? sortBy : "name";
			const order = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

			const { count, rows } = await Faculty.findAndCountAll({
				where: whereClause,
				order: [[sortField, order]],
				limit: parseInt(limit),
				offset: offset,
			});

			const totalPages = Math.ceil(count / parseInt(limit));

			res.status(200).json({
				success: true,
				data: {
					faculty: rows.map((faculty) => faculty.toSafeJSON()),
					pagination: {
						currentPage: parseInt(page),
						totalPages,
						totalItems: count,
						itemsPerPage: parseInt(limit),
						hasNextPage: parseInt(page) < totalPages,
						hasPreviousPage: parseInt(page) > 1,
					},
				},
			});
		} catch (error) {
			console.error("Error fetching faculty:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching faculty",
				error: error.message,
			});
		}
	}

	// Get faculty by ID
	static async getFacultyById(req, res) {
		try {
			const { id } = req.params;

			const faculty = await Faculty.findOne({
				where: { id, isActive: true },
			});

			if (!faculty) {
				return res.status(404).json({
					success: false,
					message: "Faculty member not found",
				});
			}

			res.status(200).json({
				success: true,
				data: faculty.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error fetching faculty:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching faculty",
				error: error.message,
			});
		}
	}

	// Create new faculty
	static async createFaculty(req, res) {
		try {
			const facultyData = req.body;

			// Check if email already exists
			const existingFaculty = await Faculty.findOne({
				where: { email: facultyData.email, isActive: true },
			});

			if (existingFaculty) {
				return res.status(400).json({
					success: false,
					message: "Faculty member with this email already exists",
				});
			}

			const faculty = await Faculty.create(facultyData);

			res.status(201).json({
				success: true,
				message: "Faculty member created successfully",
				data: faculty.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error creating faculty:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => ({
					field: err.path,
					message: err.message,
				}));
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: validationErrors,
				});
			}

			// Handle unique constraint errors
			if (error.name === "SequelizeUniqueConstraintError") {
				return res.status(400).json({
					success: false,
					message: "Email address already exists",
				});
			}

			res.status(500).json({
				success: false,
				message: "Error creating faculty",
				error: error.message,
			});
		}
	}

	// Update faculty
	static async updateFaculty(req, res) {
		try {
			const { id } = req.params;
			const updateData = req.body;

			const faculty = await Faculty.findOne({
				where: { id, isActive: true },
			});

			if (!faculty) {
				return res.status(404).json({
					success: false,
					message: "Faculty member not found",
				});
			}

			// Check if email is being updated and if it already exists
			if (updateData.email && updateData.email !== faculty.email) {
				const existingFaculty = await Faculty.findOne({
					where: {
						email: updateData.email,
						isActive: true,
						id: { [Op.ne]: id },
					},
				});

				if (existingFaculty) {
					return res.status(400).json({
						success: false,
						message: "Email address already exists",
					});
				}
			}

			await faculty.update(updateData);

			res.status(200).json({
				success: true,
				message: "Faculty member updated successfully",
				data: faculty.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error updating faculty:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => ({
					field: err.path,
					message: err.message,
				}));
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: validationErrors,
				});
			}

			res.status(500).json({
				success: false,
				message: "Error updating faculty",
				error: error.message,
			});
		}
	}

	// Soft delete faculty
	static async deleteFaculty(req, res) {
		try {
			const { id } = req.params;

			const faculty = await Faculty.findOne({
				where: { id, isActive: true },
			});

			if (!faculty) {
				return res.status(404).json({
					success: false,
					message: "Faculty member not found",
				});
			}

			await faculty.update({ isActive: false });

			res.status(200).json({
				success: true,
				message: "Faculty member deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting faculty:", error);
			res.status(500).json({
				success: false,
				message: "Error deleting faculty",
				error: error.message,
			});
		}
	}

	// Bulk delete faculty
	static async bulkDeleteFaculty(req, res) {
		try {
			const { ids } = req.body;

			if (!Array.isArray(ids) || ids.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Please provide an array of faculty IDs",
				});
			}

			const result = await Faculty.update(
				{ isActive: false },
				{ where: { id: ids, isActive: true } }
			);

			res.status(200).json({
				success: true,
				message: `${result[0]} faculty members deleted successfully`,
				deletedCount: result[0],
			});
		} catch (error) {
			console.error("Error bulk deleting faculty:", error);
			res.status(500).json({
				success: false,
				message: "Error deleting faculty",
				error: error.message,
			});
		}
	}

	// Get faculty statistics
	static async getFacultyStatistics(req, res) {
		try {
			const stats = await Faculty.getStatistics();

			res.status(200).json({
				success: true,
				data: stats,
			});
		} catch (error) {
			console.error("Error fetching faculty statistics:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching statistics",
				error: error.message,
			});
		}
	}

	// Get all departments
	static async getDepartments(req, res) {
		try {
			const departments = await Faculty.getDepartments();

			res.status(200).json({
				success: true,
				data: departments,
			});
		} catch (error) {
			console.error("Error fetching departments:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching departments",
				error: error.message,
			});
		}
	}

	// Toggle featured status
	static async toggleFeatured(req, res) {
		try {
			const { id } = req.params;

			const faculty = await Faculty.findOne({
				where: { id, isActive: true },
			});

			if (!faculty) {
				return res.status(404).json({
					success: false,
					message: "Faculty member not found",
				});
			}

			await faculty.update({ featured: !faculty.featured });

			res.status(200).json({
				success: true,
				message: `Faculty member ${
					faculty.featured ? "featured" : "unfeatured"
				} successfully`,
				data: faculty.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error toggling featured status:", error);
			res.status(500).json({
				success: false,
				message: "Error updating faculty",
				error: error.message,
			});
		}
	}

	// Get featured faculty
	static async getFeaturedFaculty(req, res) {
		try {
			const faculty = await Faculty.findAll({
				where: { featured: true, isActive: true },
				order: [["name", "ASC"]],
			});

			res.status(200).json({
				success: true,
				data: faculty.map((f) => f.toSafeJSON()),
			});
		} catch (error) {
			console.error("Error fetching featured faculty:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching featured faculty",
				error: error.message,
			});
		}
	}
}

module.exports = FacultyController;
