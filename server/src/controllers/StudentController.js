const Student = require("../models/Student");
const { Op } = require("sequelize");

class StudentController {
	// Get all students with filtering and pagination
	static async getAllStudents(req, res) {
		try {
			const {
				page = 1,
				limit = 10,
				search = "",
				program = "",
				year = "",
				status = "",
				sortBy = "firstName",
				sortOrder = "asc",
			} = req.query;

			const offset = (parseInt(page) - 1) * parseInt(limit);

			// Build where clause
			const whereClause = { isActive: true };

			if (search) {
				whereClause[Op.or] = [
					{ firstName: { [Op.like]: `%${search}%` } },
					{ lastName: { [Op.like]: `%${search}%` } },
					{ email: { [Op.like]: `%${search}%` } },
					{ studentId: { [Op.like]: `%${search}%` } },
					{ program: { [Op.like]: `%${search}%` } },
				];
			}

			if (program) {
				whereClause.program = program;
			}

			if (year) {
				whereClause.year = year;
			}

			if (status) {
				whereClause.status = status;
			}

			// Validate sort field
			const validSortFields = [
				"firstName",
				"lastName",
				"email",
				"studentId",
				"program",
				"year",
				"status",
				"gpa",
				"enrollmentDate",
				"createdAt",
			];
			const sortField = validSortFields.includes(sortBy) ? sortBy : "firstName";
			const order = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

			const { count, rows } = await Student.findAndCountAll({
				where: whereClause,
				order: [[sortField, order]],
				limit: parseInt(limit),
				offset: offset,
			});

			const totalPages = Math.ceil(count / parseInt(limit));

			res.status(200).json({
				success: true,
				data: {
					students: rows.map((student) => student.toSafeJSON()),
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
			console.error("Error fetching students:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching students",
				error: error.message,
			});
		}
	}

	// Get student by ID
	static async getStudentById(req, res) {
		try {
			const { id } = req.params;

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			res.status(200).json({
				success: true,
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error fetching student:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching student",
				error: error.message,
			});
		}
	}

	// Create new student
	static async createStudent(req, res) {
		try {
			const studentData = req.body;

			// Generate student ID if not provided
			if (!studentData.studentId) {
				studentData.studentId = await Student.generateStudentId();
			}

			// Check if email already exists
			const existingStudent = await Student.findOne({
				where: { email: studentData.email, isActive: true },
			});

			if (existingStudent) {
				return res.status(400).json({
					success: false,
					message: "Student with this email already exists",
				});
			}

			// Check if student ID already exists
			const existingStudentId = await Student.findOne({
				where: { studentId: studentData.studentId, isActive: true },
			});

			if (existingStudentId) {
				return res.status(400).json({
					success: false,
					message: "Student ID already exists",
				});
			}

			const student = await Student.create(studentData);

			res.status(201).json({
				success: true,
				message: "Student created successfully",
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error creating student:", error);

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
					message: "Email address or Student ID already exists",
				});
			}

			res.status(500).json({
				success: false,
				message: "Error creating student",
				error: error.message,
			});
		}
	}

	// Update student
	static async updateStudent(req, res) {
		try {
			const { id } = req.params;
			const updateData = req.body;

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			// Check if email is being updated and if it already exists
			if (updateData.email && updateData.email !== student.email) {
				const existingStudent = await Student.findOne({
					where: {
						email: updateData.email,
						isActive: true,
						id: { [Op.ne]: id },
					},
				});

				if (existingStudent) {
					return res.status(400).json({
						success: false,
						message: "Email address already exists",
					});
				}
			}

			// Check if student ID is being updated and if it already exists
			if (updateData.studentId && updateData.studentId !== student.studentId) {
				const existingStudentId = await Student.findOne({
					where: {
						studentId: updateData.studentId,
						isActive: true,
						id: { [Op.ne]: id },
					},
				});

				if (existingStudentId) {
					return res.status(400).json({
						success: false,
						message: "Student ID already exists",
					});
				}
			}

			await student.update(updateData);

			res.status(200).json({
				success: true,
				message: "Student updated successfully",
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error updating student:", error);

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
				message: "Error updating student",
				error: error.message,
			});
		}
	}

	// Soft delete student
	static async deleteStudent(req, res) {
		try {
			const { id } = req.params;

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			await student.update({ isActive: false });

			res.status(200).json({
				success: true,
				message: "Student deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting student:", error);
			res.status(500).json({
				success: false,
				message: "Error deleting student",
				error: error.message,
			});
		}
	}

	// Bulk delete students
	static async bulkDeleteStudents(req, res) {
		try {
			const { ids } = req.body;

			if (!Array.isArray(ids) || ids.length === 0) {
				return res.status(400).json({
					success: false,
					message: "Please provide an array of student IDs",
				});
			}

			const result = await Student.update(
				{ isActive: false },
				{ where: { id: ids, isActive: true } }
			);

			res.status(200).json({
				success: true,
				message: `${result[0]} students deleted successfully`,
				deletedCount: result[0],
			});
		} catch (error) {
			console.error("Error bulk deleting students:", error);
			res.status(500).json({
				success: false,
				message: "Error deleting students",
				error: error.message,
			});
		}
	}

	// Get student statistics
	static async getStudentStatistics(req, res) {
		try {
			const stats = await Student.getStatistics();

			res.status(200).json({
				success: true,
				data: stats,
			});
		} catch (error) {
			console.error("Error fetching student statistics:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching statistics",
				error: error.message,
			});
		}
	}

	// Get all programs
	static async getPrograms(req, res) {
		try {
			const programs = await Student.getPrograms();

			res.status(200).json({
				success: true,
				data: programs,
			});
		} catch (error) {
			console.error("Error fetching programs:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching programs",
				error: error.message,
			});
		}
	}

	// Update student status
	static async updateStudentStatus(req, res) {
		try {
			const { id } = req.params;
			const { status } = req.body;

			const validStatuses = [
				"Active",
				"Inactive",
				"On Leave",
				"Graduated",
				"Suspended",
				"Enrolled",
			];

			if (!validStatuses.includes(status)) {
				return res.status(400).json({
					success: false,
					message: "Invalid status provided",
				});
			}

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			await student.update({ status });

			res.status(200).json({
				success: true,
				message: "Student status updated successfully",
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error updating student status:", error);
			res.status(500).json({
				success: false,
				message: "Error updating student status",
				error: error.message,
			});
		}
	}

	// Update GPA
	static async updateGPA(req, res) {
		try {
			const { id } = req.params;
			const { gpa, totalCredits, completedCredits } = req.body;

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			const updateData = {};
			if (gpa !== undefined) updateData.gpa = gpa;
			if (totalCredits !== undefined) updateData.totalCredits = totalCredits;
			if (completedCredits !== undefined)
				updateData.completedCredits = completedCredits;

			await student.update(updateData);

			res.status(200).json({
				success: true,
				message: "Student academic data updated successfully",
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error updating student GPA:", error);
			res.status(500).json({
				success: false,
				message: "Error updating student academic data",
				error: error.message,
			});
		}
	}

	// Toggle featured status
	static async toggleFeatured(req, res) {
		try {
			const { id } = req.params;

			const student = await Student.findOne({
				where: { id, isActive: true },
			});

			if (!student) {
				return res.status(404).json({
					success: false,
					message: "Student not found",
				});
			}

			await student.update({ featured: !student.featured });

			res.status(200).json({
				success: true,
				message: `Student ${
					student.featured ? "featured" : "unfeatured"
				} successfully`,
				data: student.toSafeJSON(),
			});
		} catch (error) {
			console.error("Error toggling featured status:", error);
			res.status(500).json({
				success: false,
				message: "Error updating student",
				error: error.message,
			});
		}
	}

	// Get featured students
	static async getFeaturedStudents(req, res) {
		try {
			const students = await Student.findAll({
				where: { featured: true, isActive: true },
				order: [["firstName", "ASC"]],
			});

			res.status(200).json({
				success: true,
				data: students.map((s) => s.toSafeJSON()),
			});
		} catch (error) {
			console.error("Error fetching featured students:", error);
			res.status(500).json({
				success: false,
				message: "Error fetching featured students",
				error: error.message,
			});
		}
	}
}

module.exports = StudentController;
