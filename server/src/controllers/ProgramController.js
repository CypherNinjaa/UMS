const Program = require("../models/Program");
const { Op } = require("sequelize");

class ProgramController {
	// Get all programs with filtering, pagination, and search
	static async getPrograms(req, res) {
		try {
			const {
				page = 1,
				limit = 10,
				search = "",
				department = "",
				type = "",
				status = "",
				featured = "",
				sortBy = "name",
				sortOrder = "ASC",
			} = req.query;

			// Build where clause for filtering
			const whereClause = {};

			// Search functionality
			if (search) {
				whereClause[Op.or] = [
					{ name: { [Op.like]: `%${search}%` } },
					{ code: { [Op.like]: `%${search}%` } },
					{ description: { [Op.like]: `%${search}%` } },
					{ department: { [Op.like]: `%${search}%` } },
				];
			}

			// Filter by department
			if (department && department !== "All") {
				whereClause.department = department;
			}

			// Filter by type
			if (type && type !== "All") {
				whereClause.type = type;
			}

			// Filter by status
			if (status && status !== "All") {
				whereClause.status = status;
			}

			// Filter by featured
			if (featured && featured !== "All") {
				whereClause.featured = featured === "true";
			}

			// Calculate offset for pagination
			const offset = (parseInt(page) - 1) * parseInt(limit);

			// Fetch programs with filtering and pagination
			const { count, rows: programs } = await Program.findAndCountAll({
				where: whereClause,
				order: [[sortBy, sortOrder.toUpperCase()]],
				limit: parseInt(limit),
				offset: offset,
			});

			// Calculate pagination metadata
			const totalPages = Math.ceil(count / parseInt(limit));
			const hasNextPage = parseInt(page) < totalPages;
			const hasPrevPage = parseInt(page) > 1;

			return res.status(200).json({
				success: true,
				data: programs,
				pagination: {
					currentPage: parseInt(page),
					totalPages,
					totalItems: count,
					itemsPerPage: parseInt(limit),
					hasNextPage,
					hasPrevPage,
				},
			});
		} catch (error) {
			console.error("Error fetching programs:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch programs",
				error: error.message,
			});
		}
	}

	// Get program by ID
	static async getProgramById(req, res) {
		try {
			const { id } = req.params;

			const program = await Program.findByPk(id);

			if (!program) {
				return res.status(404).json({
					success: false,
					message: "Program not found",
				});
			}

			return res.status(200).json({
				success: true,
				data: program,
			});
		} catch (error) {
			console.error("Error fetching program:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch program",
				error: error.message,
			});
		}
	}

	// Create new program
	static async createProgram(req, res) {
		try {
			const programData = req.body;

			// Validate required fields
			const requiredFields = [
				"name",
				"code",
				"type",
				"duration",
				"credits",
				"department",
				"description",
				"startDate",
			];

			for (const field of requiredFields) {
				if (!programData[field]) {
					return res.status(400).json({
						success: false,
						message: `${field} is required`,
					});
				}
			}

			// Check if program code already exists
			const existingProgram = await Program.findOne({
				where: { code: programData.code.toUpperCase() },
			});

			if (existingProgram) {
				return res.status(409).json({
					success: false,
					message: "Program code already exists",
				});
			}

			// Create the program
			const newProgram = await Program.create(programData);

			return res.status(201).json({
				success: true,
				message: "Program created successfully",
				data: newProgram,
			});
		} catch (error) {
			console.error("Error creating program:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => err.message);
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: validationErrors,
				});
			}

			// Handle unique constraint errors
			if (error.name === "SequelizeUniqueConstraintError") {
				return res.status(409).json({
					success: false,
					message: "Program code must be unique",
				});
			}

			return res.status(500).json({
				success: false,
				message: "Failed to create program",
				error: error.message,
			});
		}
	}

	// Update program
	static async updateProgram(req, res) {
		try {
			const { id } = req.params;
			const updateData = req.body;

			const program = await Program.findByPk(id);

			if (!program) {
				return res.status(404).json({
					success: false,
					message: "Program not found",
				});
			}

			// Check if updating code to an existing one
			if (updateData.code && updateData.code !== program.code) {
				const existingProgram = await Program.findOne({
					where: {
						code: updateData.code.toUpperCase(),
						id: { [Op.ne]: id },
					},
				});

				if (existingProgram) {
					return res.status(409).json({
						success: false,
						message: "Program code already exists",
					});
				}
			}

			// Update the program
			await program.update(updateData);

			return res.status(200).json({
				success: true,
				message: "Program updated successfully",
				data: program,
			});
		} catch (error) {
			console.error("Error updating program:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => err.message);
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: validationErrors,
				});
			}

			return res.status(500).json({
				success: false,
				message: "Failed to update program",
				error: error.message,
			});
		}
	}

	// Delete program
	static async deleteProgram(req, res) {
		try {
			const { id } = req.params;

			const program = await Program.findByPk(id);

			if (!program) {
				return res.status(404).json({
					success: false,
					message: "Program not found",
				});
			}

			// Check if program has enrolled students
			if (program.currentEnrollment > 0) {
				return res.status(400).json({
					success: false,
					message: "Cannot delete program with enrolled students",
				});
			}

			await program.destroy();

			return res.status(200).json({
				success: true,
				message: "Program deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting program:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to delete program",
				error: error.message,
			});
		}
	}

	// Bulk delete programs
	static async bulkDeletePrograms(req, res) {
		try {
			const { ids } = req.body;

			if (!ids || !Array.isArray(ids) || ids.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Program IDs are required",
				});
			}

			// Check if any programs have enrolled students
			const programsWithEnrollment = await Program.findAll({
				where: {
					id: { [Op.in]: ids },
					currentEnrollment: { [Op.gt]: 0 },
				},
			});

			if (programsWithEnrollment.length > 0) {
				return res.status(400).json({
					success: false,
					message: "Cannot delete programs with enrolled students",
					conflictingPrograms: programsWithEnrollment.map((p) => ({
						id: p.id,
						name: p.name,
						enrollment: p.currentEnrollment,
					})),
				});
			}

			const deletedCount = await Program.destroy({
				where: { id: { [Op.in]: ids } },
			});

			return res.status(200).json({
				success: true,
				message: `${deletedCount} programs deleted successfully`,
				deletedCount,
			});
		} catch (error) {
			console.error("Error bulk deleting programs:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to delete programs",
				error: error.message,
			});
		}
	}

	// Toggle featured status
	static async toggleFeatured(req, res) {
		try {
			const { id } = req.params;

			const program = await Program.findByPk(id);

			if (!program) {
				return res.status(404).json({
					success: false,
					message: "Program not found",
				});
			}

			program.featured = !program.featured;
			await program.save();

			return res.status(200).json({
				success: true,
				message: `Program ${
					program.featured ? "featured" : "unfeatured"
				} successfully`,
				data: program,
			});
		} catch (error) {
			console.error("Error toggling featured status:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to update featured status",
				error: error.message,
			});
		}
	}

	// Get program statistics
	static async getProgramStatistics(req, res) {
		try {
			const totalPrograms = await Program.count();
			const activePrograms = await Program.count({
				where: { status: "Active" },
			});
			const featuredPrograms = await Program.count({
				where: { featured: true },
			});
			const planningPrograms = await Program.count({
				where: { status: "Planning" },
			});

			// Get total enrollment across all programs
			const programs = await Program.findAll({
				attributes: ["currentEnrollment"],
			});
			const totalEnrollment = programs.reduce(
				(sum, program) => sum + (program.currentEnrollment || 0),
				0
			);

			// Get average rating
			const programsWithRating = await Program.findAll({
				where: { rating: { [Op.gt]: 0 } },
				attributes: ["rating"],
			});
			const averageRating =
				programsWithRating.length > 0
					? programsWithRating.reduce(
							(sum, p) => sum + parseFloat(p.rating),
							0
					  ) / programsWithRating.length
					: 0;

			// Get program distribution by type
			const programTypeDistribution = await Program.findAll({
				attributes: ["type", [Program.sequelize.fn("COUNT", "*"), "count"]],
				group: ["type"],
			});

			// Get program distribution by department
			const departmentDistribution = await Program.findAll({
				attributes: [
					"department",
					[Program.sequelize.fn("COUNT", "*"), "count"],
				],
				group: ["department"],
			});

			return res.status(200).json({
				success: true,
				data: {
					totalPrograms,
					activePrograms,
					featuredPrograms,
					planningPrograms,
					totalEnrollment,
					averageRating: Math.round(averageRating * 10) / 10,
					programTypeDistribution,
					departmentDistribution,
				},
			});
		} catch (error) {
			console.error("Error fetching program statistics:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch program statistics",
				error: error.message,
			});
		}
	}

	// Get unique departments
	static async getDepartments(req, res) {
		try {
			const departments = await Program.findAll({
				attributes: [
					[
						Program.sequelize.fn(
							"DISTINCT",
							Program.sequelize.col("department")
						),
						"department",
					],
				],
				order: [["department", "ASC"]],
			});

			const departmentList = ["All", ...departments.map((d) => d.department)];

			return res.status(200).json({
				success: true,
				data: departmentList,
			});
		} catch (error) {
			console.error("Error fetching departments:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to fetch departments",
				error: error.message,
			});
		}
	}

	// Update enrollment count
	static async updateEnrollment(req, res) {
		try {
			const { id } = req.params;
			const { enrollment } = req.body;

			const program = await Program.findByPk(id);

			if (!program) {
				return res.status(404).json({
					success: false,
					message: "Program not found",
				});
			}

			if (enrollment > program.capacity) {
				return res.status(400).json({
					success: false,
					message: "Enrollment cannot exceed program capacity",
				});
			}

			program.currentEnrollment = enrollment;
			await program.save();

			return res.status(200).json({
				success: true,
				message: "Enrollment updated successfully",
				data: program,
			});
		} catch (error) {
			console.error("Error updating enrollment:", error);
			return res.status(500).json({
				success: false,
				message: "Failed to update enrollment",
				error: error.message,
			});
		}
	}
}

module.exports = ProgramController;
