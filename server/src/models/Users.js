const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
	"Users",
	{
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		mobile_no: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		faculty_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "faculty",
				key: "id",
			},
			comment: "Links to faculty table for faculty users",
		},
		student_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "students",
				key: "id",
			},
			comment: "Links to students table for student users",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Users;
