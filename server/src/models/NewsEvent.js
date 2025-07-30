const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const NewsEvent = sequelize.define(
	"NewsEvent",
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Title cannot be empty",
				},
				len: {
					args: [3, 255],
					msg: "Title must be between 3 and 255 characters",
				},
			},
		},
		type: {
			type: DataTypes.ENUM("News", "Event", "Announcement"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Type cannot be empty",
				},
				isIn: {
					args: [["News", "Event", "Announcement"]],
					msg: "Type must be News, Event, or Announcement",
				},
			},
		},
		category: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Category cannot be empty",
				},
				len: {
					args: [2, 100],
					msg: "Category must be between 2 and 100 characters",
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
				len: {
					args: [10, 1000],
					msg: "Description must be between 10 and 1000 characters",
				},
			},
		},
		content: {
			type: DataTypes.TEXT("long"),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Content cannot be empty",
				},
				len: {
					args: [20],
					msg: "Content must be at least 20 characters",
				},
			},
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Author cannot be empty",
				},
				len: {
					args: [2, 255],
					msg: "Author name must be between 2 and 255 characters",
				},
			},
		},
		publishDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Publish date cannot be empty",
				},
				isDate: {
					msg: "Publish date must be a valid date",
				},
			},
		},
		eventDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: {
					msg: "Event date must be a valid date",
				},
				isAfterOrEqualToPublish(value) {
					if (
						value &&
						this.publishDate &&
						new Date(value) < new Date(this.publishDate)
					) {
						throw new Error("Event date cannot be before publish date");
					}
				},
			},
		},
		eventTime: {
			type: DataTypes.TIME,
			allowNull: true,
			validate: {
				is: {
					args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
					msg: "Event time must be in HH:MM format",
				},
			},
		},
		location: {
			type: DataTypes.STRING(500),
			allowNull: true,
			validate: {
				len: {
					args: [0, 500],
					msg: "Location must be less than 500 characters",
				},
			},
		},
		status: {
			type: DataTypes.ENUM("Published", "Draft", "Archived", "Scheduled"),
			allowNull: false,
			defaultValue: "Draft",
			validate: {
				isIn: {
					args: [["Published", "Draft", "Archived", "Scheduled"]],
					msg: "Status must be Published, Draft, Archived, or Scheduled",
				},
			},
		},
		featured: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		image: {
			type: DataTypes.STRING(1000),
			allowNull: true,
		},
		views: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: {
					args: [0],
					msg: "Views cannot be negative",
				},
			},
		},
		registrations: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			validate: {
				min: {
					args: [0],
					msg: "Registrations cannot be negative",
				},
			},
		},
		tags: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				const rawValue = this.getDataValue("tags");
				return rawValue ? JSON.parse(rawValue) : [];
			},
			set(value) {
				this.setDataValue(
					"tags",
					Array.isArray(value) ? JSON.stringify(value) : value
				);
			},
		},
		metadata: {
			type: DataTypes.TEXT,
			allowNull: true,
			get() {
				const rawValue = this.getDataValue("metadata");
				return rawValue ? JSON.parse(rawValue) : {};
			},
			set(value) {
				this.setDataValue(
					"metadata",
					typeof value === "object" ? JSON.stringify(value) : value
				);
			},
		},
	},
	{
		tableName: "news_events",
		timestamps: true,
		indexes: [
			{
				fields: ["status"],
			},
			{
				fields: ["type"],
			},
			{
				fields: ["category"],
			},
			{
				fields: ["publishDate"],
			},
			{
				fields: ["eventDate"],
			},
			{
				fields: ["featured"],
			},
		],
		validate: {
			eventDetailsRequired() {
				if (this.type === "Event") {
					if (!this.eventDate) {
						throw new Error("Event date is required for Event type");
					}
				}
			},
		},
	}
);

module.exports = NewsEvent;
