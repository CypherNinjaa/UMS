const NewsEvent = require("../models/NewsEvent");
const { Op } = require("sequelize");

class NewsEventController {
	// Get all news and events with filtering, pagination, and search
	static async getNewsEvents(req, res) {
		try {
			const {
				page = 1,
				limit = 10,
				search = "",
				type = "",
				category = "",
				status = "",
				featured = "",
				sortBy = "publishDate",
				sortOrder = "DESC",
			} = req.query;

			// Build where clause for filtering
			const whereClause = {};

			// Search functionality
			if (search) {
				whereClause[Op.or] = [
					{ title: { [Op.like]: `%${search}%` } },
					{ description: { [Op.like]: `%${search}%` } },
					{ content: { [Op.like]: `%${search}%` } },
					{ author: { [Op.like]: `%${search}%` } },
					{ category: { [Op.like]: `%${search}%` } },
				];
			}

			// Filter by type
			if (type && type !== "All") {
				whereClause.type = type;
			}

			// Filter by category
			if (category && category !== "All") {
				whereClause.category = category;
			}

			// Filter by status
			if (status && status !== "All") {
				whereClause.status = status;
			}

			// Filter by featured
			if (featured && featured !== "All") {
				whereClause.featured = featured === "true";
			}

			// Calculate pagination
			const offset = (page - 1) * limit;

			// Validate sort field
			const allowedSortFields = [
				"id",
				"title",
				"type",
				"category",
				"author",
				"publishDate",
				"eventDate",
				"status",
				"featured",
				"views",
				"registrations",
				"createdAt",
				"updatedAt",
			];

			const sortField = allowedSortFields.includes(sortBy)
				? sortBy
				: "publishDate";
			const order = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

			// Get news events with pagination
			const { count, rows: newsEvents } = await NewsEvent.findAndCountAll({
				where: whereClause,
				limit: parseInt(limit),
				offset: parseInt(offset),
				order: [[sortField, order]],
				distinct: true,
			});

			// Calculate pagination info
			const totalPages = Math.ceil(count / limit);
			const hasNextPage = page < totalPages;
			const hasPrevPage = page > 1;

			res.status(200).json({
				success: true,
				data: newsEvents,
				pagination: {
					currentPage: parseInt(page),
					totalPages,
					totalItems: count,
					itemsPerPage: parseInt(limit),
					hasNextPage,
					hasPrevPage,
				},
				filters: {
					search,
					type,
					category,
					status,
					featured,
					sortBy: sortField,
					sortOrder: order,
				},
			});
		} catch (error) {
			console.error("Error fetching news events:", error);
			res.status(500).json({
				success: false,
				message: "Failed to fetch news and events",
				error: error.message,
			});
		}
	}

	// Get a single news event by ID
	static async getNewsEventById(req, res) {
		try {
			const { id } = req.params;

			const newsEvent = await NewsEvent.findByPk(id);

			if (!newsEvent) {
				return res.status(404).json({
					success: false,
					message: "News/Event not found",
				});
			}

			// Increment view count
			await newsEvent.increment("views");

			res.status(200).json({
				success: true,
				data: newsEvent,
			});
		} catch (error) {
			console.error("Error fetching news event:", error);
			res.status(500).json({
				success: false,
				message: "Failed to fetch news/event",
				error: error.message,
			});
		}
	}

	// Create a new news event
	static async createNewsEvent(req, res) {
		try {
			const {
				title,
				type,
				category,
				description,
				content,
				author,
				publishDate,
				eventDate,
				eventTime,
				location,
				status = "Draft",
				featured = false,
				image,
				tags,
				metadata,
			} = req.body;

			// Validate required fields
			if (
				!title ||
				!type ||
				!category ||
				!description ||
				!content ||
				!author ||
				!publishDate
			) {
				return res.status(400).json({
					success: false,
					message: "Missing required fields",
					required: [
						"title",
						"type",
						"category",
						"description",
						"content",
						"author",
						"publishDate",
					],
				});
			}

			// Clean up empty image field - convert empty string to null
			const cleanImage = image && image.trim() !== "" ? image : null;

			// Create news event
			const newsEvent = await NewsEvent.create({
				title,
				type,
				category,
				description,
				content,
				author,
				publishDate,
				eventDate,
				eventTime,
				location,
				status,
				featured,
				image: cleanImage,
				tags,
				metadata,
			});

			res.status(201).json({
				success: true,
				data: newsEvent,
				message: "News/Event created successfully",
			});
		} catch (error) {
			console.error("Error creating news event:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => ({
					field: err.path,
					message: err.message,
				}));

				return res.status(400).json({
					success: false,
					message: "Validation failed",
					errors: validationErrors,
				});
			}

			res.status(500).json({
				success: false,
				message: "Failed to create news/event",
				error: error.message,
			});
		}
	}

	// Update a news event
	static async updateNewsEvent(req, res) {
		try {
			const { id } = req.params;
			const {
				title,
				type,
				category,
				description,
				content,
				author,
				publishDate,
				eventDate,
				eventTime,
				location,
				status,
				featured,
				image,
				tags,
				metadata,
			} = req.body;

			const newsEvent = await NewsEvent.findByPk(id);

			if (!newsEvent) {
				return res.status(404).json({
					success: false,
					message: "News/Event not found",
				});
			}

			// Clean up empty image field - convert empty string to null
			const cleanImage = image && image.trim() !== "" ? image : null;

			// Update the news event
			await newsEvent.update({
				title,
				type,
				category,
				description,
				content,
				author,
				publishDate,
				eventDate,
				eventTime,
				location,
				status,
				featured,
				image: cleanImage,
				tags,
				metadata,
			});

			res.status(200).json({
				success: true,
				data: newsEvent,
				message: "News/Event updated successfully",
			});
		} catch (error) {
			console.error("Error updating news event:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => ({
					field: err.path,
					message: err.message,
				}));

				return res.status(400).json({
					success: false,
					message: "Validation failed",
					errors: validationErrors,
				});
			}

			res.status(500).json({
				success: false,
				message: "Failed to update news/event",
				error: error.message,
			});
		}
	}

	// Delete a news event
	static async deleteNewsEvent(req, res) {
		try {
			const { id } = req.params;

			const newsEvent = await NewsEvent.findByPk(id);

			if (!newsEvent) {
				return res.status(404).json({
					success: false,
					message: "News/Event not found",
				});
			}

			await newsEvent.destroy();

			res.status(200).json({
				success: true,
				message: "News/Event deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting news event:", error);
			res.status(500).json({
				success: false,
				message: "Failed to delete news/event",
				error: error.message,
			});
		}
	}

	// Get dashboard statistics
	static async getDashboardStats(req, res) {
		try {
			const totalItems = await NewsEvent.count();
			const publishedItems = await NewsEvent.count({
				where: { status: "Published" },
			});
			const upcomingEvents = await NewsEvent.count({
				where: {
					type: "Event",
					eventDate: {
						[Op.gte]: new Date(),
					},
					status: "Published",
				},
			});
			const totalViews = (await NewsEvent.sum("views")) || 0;
			const totalRegistrations = (await NewsEvent.sum("registrations")) || 0;

			// Get recent activity (last 30 days)
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

			const recentItems = await NewsEvent.count({
				where: {
					createdAt: {
						[Op.gte]: thirtyDaysAgo,
					},
				},
			});

			// Get category distribution
			const categoryStats = await NewsEvent.findAll({
				attributes: [
					"category",
					[
						NewsEvent.sequelize.fn("COUNT", NewsEvent.sequelize.col("id")),
						"count",
					],
				],
				group: ["category"],
				order: [[NewsEvent.sequelize.literal("count"), "DESC"]],
			});

			// Get type distribution
			const typeStats = await NewsEvent.findAll({
				attributes: [
					"type",
					[
						NewsEvent.sequelize.fn("COUNT", NewsEvent.sequelize.col("id")),
						"count",
					],
				],
				group: ["type"],
			});

			res.status(200).json({
				success: true,
				data: {
					overview: {
						totalItems,
						publishedItems,
						upcomingEvents,
						totalViews,
						totalRegistrations,
						recentItems,
					},
					categoryDistribution: categoryStats,
					typeDistribution: typeStats,
				},
			});
		} catch (error) {
			console.error("Error fetching dashboard stats:", error);
			res.status(500).json({
				success: false,
				message: "Failed to fetch dashboard statistics",
				error: error.message,
			});
		}
	}

	// Get featured news and events
	static async getFeaturedNewsEvents(req, res) {
		try {
			const { limit = 5, type = "" } = req.query;

			const whereClause = {
				featured: true,
				status: "Published",
			};

			if (type && type !== "All") {
				whereClause.type = type;
			}

			const featuredItems = await NewsEvent.findAll({
				where: whereClause,
				limit: parseInt(limit),
				order: [["publishDate", "DESC"]],
			});

			res.status(200).json({
				success: true,
				data: featuredItems,
			});
		} catch (error) {
			console.error("Error fetching featured items:", error);
			res.status(500).json({
				success: false,
				message: "Failed to fetch featured news and events",
				error: error.message,
			});
		}
	}

	// Update news event status
	static async updateNewsEventStatus(req, res) {
		try {
			const { id } = req.params;
			const { status } = req.body;

			if (!["Published", "Draft", "Archived", "Scheduled"].includes(status)) {
				return res.status(400).json({
					success: false,
					message:
						"Invalid status. Must be Published, Draft, Archived, or Scheduled",
				});
			}

			const newsEvent = await NewsEvent.findByPk(id);

			if (!newsEvent) {
				return res.status(404).json({
					success: false,
					message: "News/Event not found",
				});
			}

			await newsEvent.update({ status });

			res.status(200).json({
				success: true,
				data: newsEvent,
				message: "Status updated successfully",
			});
		} catch (error) {
			console.error("Error updating status:", error);
			res.status(500).json({
				success: false,
				message: "Failed to update status",
				error: error.message,
			});
		}
	}

	// Toggle featured status
	static async toggleFeatured(req, res) {
		try {
			const { id } = req.params;

			const newsEvent = await NewsEvent.findByPk(id);

			if (!newsEvent) {
				return res.status(404).json({
					success: false,
					message: "News/Event not found",
				});
			}

			await newsEvent.update({ featured: !newsEvent.featured });

			res.status(200).json({
				success: true,
				data: newsEvent,
				message: `Item ${
					newsEvent.featured ? "featured" : "unfeatured"
				} successfully`,
			});
		} catch (error) {
			console.error("Error toggling featured status:", error);
			res.status(500).json({
				success: false,
				message: "Failed to toggle featured status",
				error: error.message,
			});
		}
	}
}

module.exports = NewsEventController;
