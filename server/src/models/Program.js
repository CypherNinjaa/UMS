const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Program = sequelize.define(
	"Program",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(200),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Program name cannot be empty",
				},
				len: {
					args: [2, 200],
					msg: "Program name must be between 2 and 200 characters",
				},
			},
		},
		code: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: {
				msg: "Program code must be unique",
			},
			validate: {
				notEmpty: {
					msg: "Program code cannot be empty",
				},
				isUppercase: {
					msg: "Program code must be uppercase",
				},
			},
		},
		type: {
			type: DataTypes.ENUM(
				"Undergraduate",
				"Graduate",
				"Certificate",
				"Diploma",
				"Doctorate"
			),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Program type cannot be empty",
				},
			},
		},
		duration: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Duration cannot be empty",
				},
			},
		},
		credits: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: {
					msg: "Credits must be a valid integer",
				},
				min: {
					args: [1],
					msg: "Credits must be at least 1",
				},
				max: {
					args: [300],
					msg: "Credits cannot exceed 300",
				},
			},
		},
		department: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Department cannot be empty",
				},
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Description cannot be empty",
				},
			},
		},
		requirements: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM(
				"Active",
				"Inactive",
				"Planning",
				"Suspended",
				"Completed"
			),
			allowNull: false,
			defaultValue: "Planning",
		},
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 50,
			validate: {
				isInt: {
					msg: "Capacity must be a valid integer",
				},
				min: {
					args: [1],
					msg: "Capacity must be at least 1",
				},
			},
		},
		currentEnrollment: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				isInt: {
					msg: "Current enrollment must be a valid integer",
				},
				min: {
					args: [0],
					msg: "Current enrollment cannot be negative",
				},
			},
		},
		tuitionFee: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			validate: {
				min: {
					args: [0],
					msg: "Tuition fee cannot be negative",
				},
			},
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: {
					msg: "Start date must be a valid date",
				},
			},
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: "End date must be a valid date",
				},
				isAfterStartDate(value) {
					if (value && this.startDate && value <= this.startDate) {
						throw new Error("End date must be after start date");
					}
				},
			},
		},
		featured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		rating: {
			type: DataTypes.DECIMAL(2, 1),
			allowNull: true,
			defaultValue: 0.0,
			validate: {
				min: {
					args: [0.0],
					msg: "Rating cannot be negative",
				},
				max: {
					args: [5.0],
					msg: "Rating cannot exceed 5.0",
				},
			},
		},
		objectives: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		outcomes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		facultyAssigned: {
			type: DataTypes.TEXT, // JSON string of faculty IDs
			allowNull: true,
			get() {
				const rawValue = this.getDataValue("facultyAssigned");
				return rawValue ? JSON.parse(rawValue) : [];
			},
			set(value) {
				this.setDataValue("facultyAssigned", JSON.stringify(value || []));
			},
		},
		prerequisites: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		applicationDeadline: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: {
					msg: "Application deadline must be a valid date",
				},
			},
		},
		programImage: {
			type: DataTypes.TEXT, // Base64 encoded image
			allowNull: true,
		},
		isOnline: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		accreditation: {
			type: DataTypes.STRING(200),
			allowNull: true,
		},
		careerProspects: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "programs",
		timestamps: true,
		indexes: [
			{
				fields: ["code"],
				unique: true,
			},
			{
				fields: ["department"],
			},
			{
				fields: ["type"],
			},
			{
				fields: ["status"],
			},
			{
				fields: ["featured"],
			},
		],
		hooks: {
			beforeValidate: (program) => {
				// Ensure code is uppercase
				if (program.code) {
					program.code = program.code.toUpperCase();
				}
			},
			beforeSave: (program) => {
				// Validate enrollment doesn't exceed capacity
				if (program.currentEnrollment > program.capacity) {
					throw new Error("Current enrollment cannot exceed program capacity");
				}
			},
		},
	}
);

module.exports = Program;
