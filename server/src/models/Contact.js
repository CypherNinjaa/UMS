const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contact = sequelize.define(
	"Contact",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fullName: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Full name is required",
				},
				len: {
					args: [2, 100],
					msg: "Full name must be between 2 and 100 characters",
				},
				is: {
					args: /^[a-zA-Z\s]+$/,
					msg: "Full name can only contain letters and spaces",
				},
			},
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Email is required",
				},
				isEmail: {
					msg: "Please provide a valid email address",
				},
			},
		},
		phone: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Phone number is required",
				},
				is: {
					args: /^[6-9]\d{9}$/,
					msg: "Please provide a valid 10-digit Indian phone number",
				},
			},
		},
		organisationName: {
			type: DataTypes.STRING(200),
			allowNull: true,
			validate: {
				len: {
					args: [0, 200],
					msg: "Organisation name cannot exceed 200 characters",
				},
			},
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Message is required",
				},
				len: {
					args: [10, 1000],
					msg: "Message must be between 10 and 1000 characters",
				},
			},
		},
		enquiryType: {
			type: DataTypes.ENUM("course", "corporate"),
			allowNull: false,
			defaultValue: "course",
			validate: {
				isIn: {
					args: [["course", "corporate"]],
					msg: "Enquiry type must be either 'course' or 'corporate'",
				},
			},
		},
		status: {
			type: DataTypes.ENUM("pending", "reviewed", "responded", "closed"),
			allowNull: false,
			defaultValue: "pending",
		},
		priority: {
			type: DataTypes.ENUM("low", "medium", "high", "urgent"),
			allowNull: false,
			defaultValue: "medium",
		},
		adminNotes: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		responseDate: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		respondedBy: {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "User ID of admin who responded",
		},
		ipAddress: {
			type: DataTypes.STRING(45),
			allowNull: true,
		},
		userAgent: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		tableName: "contacts",
		timestamps: true,
		indexes: [
			{
				fields: ["email"],
			},
			{
				fields: ["status"],
			},
			{
				fields: ["enquiryType"],
			},
			{
				fields: ["createdAt"],
			},
		],
	}
);

module.exports = Contact;
