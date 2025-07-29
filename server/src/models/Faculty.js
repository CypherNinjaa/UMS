const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Faculty = sequelize.define(
	"Faculty",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Name cannot be empty",
				},
				len: {
					args: [2, 100],
					msg: "Name must be between 2 and 100 characters",
				},
			},
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Title cannot be empty",
				},
			},
		},
		department: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Department cannot be empty",
				},
			},
		},
		specialization: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: {
				msg: "Email address already exists",
			},
			validate: {
				isEmail: {
					msg: "Please provide a valid email address",
				},
			},
		},
		phone: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Phone number cannot be empty",
				},
			},
		},
		status: {
			type: DataTypes.ENUM("Active", "Inactive", "Pending"),
			defaultValue: "Active",
			allowNull: false,
		},
		joinDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: DataTypes.NOW,
			validate: {
				isDate: {
					msg: "Please provide a valid join date",
				},
			},
		},
		featured: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		profileImage: {
			type: DataTypes.TEXT("long"),
			allowNull: true,
		},
		bio: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		experience: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: {
					args: 0,
					msg: "Experience cannot be negative",
				},
			},
		},
		qualification: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		research_interests: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		publications: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				min: {
					args: [0],
					msg: "Publications count cannot be negative",
				},
			},
		},
		office_location: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		office_hours: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		salary: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
			validate: {
				min: {
					args: 0,
					msg: "Salary cannot be negative",
				},
			},
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
	},
	{
		tableName: "faculty",
		timestamps: true, // This creates createdAt and updatedAt fields
		indexes: [
			{
				fields: ["email"],
				unique: true,
			},
			{
				fields: ["department"],
			},
			{
				fields: ["status"],
			},
			{
				fields: ["featured"],
			},
		],
	}
);

// Instance methods
Faculty.prototype.toSafeJSON = function () {
	const faculty = this.toJSON();
	// Remove sensitive information from response
	delete faculty.salary;
	return faculty;
};

// Class methods
Faculty.getStatistics = async function () {
	try {
		const stats = await Faculty.findAll({
			attributes: [
				[sequelize.fn("COUNT", sequelize.col("id")), "totalFaculty"],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'Active' THEN 1 END")
					),
					"activeFaculty",
				],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN featured = true THEN 1 END")
					),
					"featuredFaculty",
				],
				[
					sequelize.fn(
						"COUNT",
						sequelize.literal("CASE WHEN status = 'Pending' THEN 1 END")
					),
					"pendingFaculty",
				],
			],
			raw: true,
		});

		const departmentStats = await Faculty.findAll({
			attributes: [
				"department",
				[sequelize.fn("COUNT", sequelize.col("id")), "count"],
			],
			group: ["department"],
			raw: true,
		});

		return {
			...stats[0],
			departmentDistribution: departmentStats,
		};
	} catch (error) {
		throw new Error("Error fetching faculty statistics: " + error.message);
	}
};

Faculty.getDepartments = async function () {
	try {
		const departments = await Faculty.findAll({
			attributes: [
				[sequelize.fn("DISTINCT", sequelize.col("department")), "department"],
			],
			raw: true,
		});
		return departments.map((d) => d.department);
	} catch (error) {
		throw new Error("Error fetching departments: " + error.message);
	}
};

module.exports = Faculty;
