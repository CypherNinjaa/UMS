const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Student = sequelize.define(
	"Student",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		studentId: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [2, 50],
			},
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: true,
				len: [2, 50],
			},
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: true,
			validate: {
				len: [10, 20],
			},
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: true,
				isBefore: new Date().toISOString().split("T")[0], // Must be before today
			},
		},
		gender: {
			type: DataTypes.ENUM("Male", "Female", "Other"),
			allowNull: true,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		state: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		zipCode: {
			type: DataTypes.STRING(10),
			allowNull: true,
		},
		country: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: "United States",
		},
		program: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		year: {
			type: DataTypes.ENUM(
				"1st Year",
				"2nd Year",
				"3rd Year",
				"4th Year",
				"Graduate"
			),
			allowNull: false,
		},
		semester: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		status: {
			type: DataTypes.ENUM(
				"Active",
				"Inactive",
				"On Leave",
				"Graduated",
				"Suspended",
				"Enrolled"
			),
			allowNull: false,
			defaultValue: "Active",
		},
		enrollmentDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				isDate: true,
			},
		},
		graduationDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: true,
			},
		},
		gpa: {
			type: DataTypes.DECIMAL(3, 2),
			allowNull: true,
			defaultValue: 0.0,
			validate: {
				min: 0.0,
				max: 4.0,
			},
		},
		totalCredits: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			validate: {
				min: 0,
				max: 200,
			},
		},
		completedCredits: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			validate: {
				min: 0,
				max: 200,
			},
		},
		guardianName: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		guardianPhone: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		guardianEmail: {
			type: DataTypes.STRING(100),
			allowNull: true,
			validate: {
				isEmail: true,
			},
		},
		guardianRelationship: {
			type: DataTypes.STRING(30),
			allowNull: true,
		},
		emergencyContactName: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		emergencyContactPhone: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		profileImage: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
		featured: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		lastLoginDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		applicationDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		tuitionStatus: {
			type: DataTypes.ENUM("Paid", "Pending", "Overdue", "Partial", "Waived"),
			allowNull: true,
			defaultValue: "Pending",
		},
		scholarshipAmount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			defaultValue: 0.0,
		},
	},
	{
		tableName: "students",
		timestamps: true,
		indexes: [
			{
				fields: ["email"],
				unique: true,
			},
			{
				fields: ["studentId"],
				unique: true,
			},
			{
				fields: ["program"],
			},
			{
				fields: ["status"],
			},
			{
				fields: ["year"],
			},
			{
				fields: ["isActive"],
			},
		],
	}
);

// Instance methods
Student.prototype.toSafeJSON = function () {
	const student = this.toJSON();
	// Remove sensitive information if needed
	return student;
};

Student.prototype.getFullName = function () {
	return `${this.firstName} ${this.lastName}`;
};

Student.prototype.getAge = function () {
	const today = new Date();
	const birthDate = new Date(this.dateOfBirth);
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
};

// Class methods
Student.getStatistics = async function () {
	try {
		const stats = await Student.findAll({
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("id")), "totalStudents"],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'Active' THEN 1 END")
					),
					"activeStudents",
				],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'Graduated' THEN 1 END")
					),
					"graduatedStudents",
				],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'On Leave' THEN 1 END")
					),
					"studentsOnLeave",
				],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'Suspended' THEN 1 END")
					),
					"suspendedStudents",
				],
				[sequelize.fn("AVG", sequelize.col("gpa")), "averageGpa"],
				[sequelize.fn("SUM", sequelize.col("totalCredits")), "totalCreditsAll"],
			],
			where: { isActive: true },
			raw: true,
		});

		const programStats = await Student.findAll({
			attributes: [
				"program",
				[sequelize.fn("COUNT", sequelize.col("id")), "count"],
			],
			where: { isActive: true },
			group: ["program"],
			raw: true,
		});

		const yearStats = await Student.findAll({
			attributes: [
				"year",
				[sequelize.fn("COUNT", sequelize.col("id")), "count"],
			],
			where: { isActive: true },
			group: ["year"],
			raw: true,
		});

		const statusStats = await Student.findAll({
			attributes: [
				"status",
				[sequelize.fn("COUNT", sequelize.col("id")), "count"],
			],
			where: { isActive: true },
			group: ["status"],
			raw: true,
		});

		return {
			...stats[0],
			programDistribution: programStats,
			yearDistribution: yearStats,
			statusDistribution: statusStats,
		};
	} catch (error) {
		throw new Error("Error fetching student statistics: " + error.message);
	}
};

Student.getPrograms = async function () {
	try {
		const programs = await Student.findAll({
			attributes: [
				[sequelize.fn("DISTINCT", sequelize.col("program")), "program"],
			],
			where: { isActive: true },
			raw: true,
		});
		return programs.map((p) => p.program);
	} catch (error) {
		throw new Error("Error fetching programs: " + error.message);
	}
};

Student.generateStudentId = async function () {
	const currentYear = new Date().getFullYear();
	const prefix = `STU${currentYear}`;

	// Find the highest student ID for current year
	const lastStudent = await Student.findOne({
		where: {
			studentId: {
				[sequelize.Sequelize.Op.like]: `${prefix}%`,
			},
		},
		order: [["studentId", "DESC"]],
		raw: true,
	});

	let nextNumber = 1;
	if (lastStudent) {
		const lastNumber = parseInt(lastStudent.studentId.replace(prefix, ""));
		nextNumber = lastNumber + 1;
	}

	return `${prefix}${nextNumber.toString().padStart(3, "0")}`;
};

module.exports = Student;
