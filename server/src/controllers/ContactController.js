const Contact = require("../models/Contact");
const { Op } = require("sequelize");

const ContactController = {
	// Create a new contact submission
	createContact: async (req, res) => {
		try {
			const { fullName, email, phone, organisationName, message, enquiryType } =
				req.body;

			// Additional server-side validation
			if (!fullName || fullName.trim().length < 2) {
				return res.status(400).json({
					success: false,
					message: "Full name must be at least 2 characters long",
				});
			}

			if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				return res.status(400).json({
					success: false,
					message: "Please provide a valid email address",
				});
			}

			if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
				return res.status(400).json({
					success: false,
					message: "Please provide a valid 10-digit Indian phone number",
				});
			}

			if (!message || message.trim().length < 10) {
				return res.status(400).json({
					success: false,
					message: "Message must be at least 10 characters long",
				});
			}

			if (enquiryType === "corporate" && !organisationName) {
				return res.status(400).json({
					success: false,
					message: "Organisation name is required for corporate enquiries",
				});
			}

			// Check for duplicate submissions within last 5 minutes
			const recentSubmission = await Contact.findOne({
				where: {
					email: email.toLowerCase(),
					createdAt: {
						[Op.gte]: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
					},
				},
			});

			if (recentSubmission) {
				return res.status(429).json({
					success: false,
					message:
						"You have recently submitted a contact form. Please wait 5 minutes before submitting again.",
				});
			}

			// Get client IP and User Agent
			const ipAddress =
				req.headers["x-forwarded-for"] ||
				req.connection.remoteAddress ||
				req.socket.remoteAddress ||
				req.ip;
			const userAgent = req.headers["user-agent"];

			// Create contact entry
			const contact = await Contact.create({
				fullName: fullName.trim(),
				email: email.toLowerCase().trim(),
				phone: phone.trim(),
				organisationName: organisationName?.trim() || null,
				message: message.trim(),
				enquiryType: enquiryType || "course",
				ipAddress,
				userAgent,
			});

			res.status(201).json({
				success: true,
				message: "Contact form submitted successfully!",
				data: {
					id: contact.id,
					submissionTime: contact.createdAt,
				},
			});
		} catch (error) {
			console.error("Error creating contact:", error);

			// Handle validation errors
			if (error.name === "SequelizeValidationError") {
				const validationErrors = error.errors.map((err) => err.message);
				return res.status(400).json({
					success: false,
					message: "Validation error",
					errors: validationErrors,
				});
			}

			res.status(500).json({
				success: false,
				message: "Server error. Please try again later.",
			});
		}
	},

	// Get all contacts for admin dashboard
	getAllContacts: async (req, res) => {
		try {
			const {
				page = 1,
				limit = 10,
				status,
				enquiryType,
				priority,
				search,
				sortBy = "createdAt",
				sortOrder = "DESC",
			} = req.query;

			const offset = (page - 1) * limit;
			const whereConditions = {};

			// Apply filters
			if (status) {
				whereConditions.status = status;
			}

			if (enquiryType) {
				whereConditions.enquiryType = enquiryType;
			}

			if (priority) {
				whereConditions.priority = priority;
			}

			if (search) {
				whereConditions[Op.or] = [
					{ fullName: { [Op.like]: `%${search}%` } },
					{ email: { [Op.like]: `%${search}%` } },
					{ organisationName: { [Op.like]: `%${search}%` } },
					{ message: { [Op.like]: `%${search}%` } },
				];
			}

			const { count, rows } = await Contact.findAndCountAll({
				where: whereConditions,
				order: [[sortBy, sortOrder.toUpperCase()]],
				limit: parseInt(limit),
				offset: parseInt(offset),
			});

			res.status(200).json({
				success: true,
				data: {
					contacts: rows,
					pagination: {
						currentPage: parseInt(page),
						totalPages: Math.ceil(count / limit),
						totalItems: count,
						itemsPerPage: parseInt(limit),
					},
				},
			});
		} catch (error) {
			console.error("Error fetching contacts:", error);
			res.status(500).json({
				success: false,
				message: "Server error while fetching contacts",
			});
		}
	},

	// Get contact by ID
	getContactById: async (req, res) => {
		try {
			const { id } = req.params;

			const contact = await Contact.findByPk(id);

			if (!contact) {
				return res.status(404).json({
					success: false,
					message: "Contact not found",
				});
			}

			res.status(200).json({
				success: true,
				data: contact,
			});
		} catch (error) {
			console.error("Error fetching contact:", error);
			res.status(500).json({
				success: false,
				message: "Server error while fetching contact",
			});
		}
	},

	// Update contact status and admin notes
	updateContact: async (req, res) => {
		try {
			const { id } = req.params;
			const { status, priority, adminNotes, respondedBy } = req.body;

			const contact = await Contact.findByPk(id);

			if (!contact) {
				return res.status(404).json({
					success: false,
					message: "Contact not found",
				});
			}

			const updateData = {};

			if (status) updateData.status = status;
			if (priority) updateData.priority = priority;
			if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
			if (respondedBy) updateData.respondedBy = respondedBy;

			// Set response date if status is changed to responded
			if (status === "responded" && contact.status !== "responded") {
				updateData.responseDate = new Date();
			}

			await contact.update(updateData);

			res.status(200).json({
				success: true,
				message: "Contact updated successfully",
				data: contact,
			});
		} catch (error) {
			console.error("Error updating contact:", error);
			res.status(500).json({
				success: false,
				message: "Server error while updating contact",
			});
		}
	},

	// Delete contact
	deleteContact: async (req, res) => {
		try {
			const { id } = req.params;

			const contact = await Contact.findByPk(id);

			if (!contact) {
				return res.status(404).json({
					success: false,
					message: "Contact not found",
				});
			}

			await contact.destroy();

			res.status(200).json({
				success: true,
				message: "Contact deleted successfully",
			});
		} catch (error) {
			console.error("Error deleting contact:", error);
			res.status(500).json({
				success: false,
				message: "Server error while deleting contact",
			});
		}
	},

	// Get dashboard statistics
	getContactStats: async (req, res) => {
		try {
			const totalContacts = await Contact.count();
			const pendingContacts = await Contact.count({
				where: { status: "pending" },
			});
			const reviewedContacts = await Contact.count({
				where: { status: "reviewed" },
			});
			const respondedContacts = await Contact.count({
				where: { status: "responded" },
			});

			const courseEnquiries = await Contact.count({
				where: { enquiryType: "course" },
			});
			const corporateEnquiries = await Contact.count({
				where: { enquiryType: "corporate" },
			});

			// Recent contacts (last 7 days)
			const recentContacts = await Contact.count({
				where: {
					createdAt: {
						[Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
					},
				},
			});

			res.status(200).json({
				success: true,
				data: {
					totalContacts,
					pendingContacts,
					reviewedContacts,
					respondedContacts,
					courseEnquiries,
					corporateEnquiries,
					recentContacts,
				},
			});
		} catch (error) {
			console.error("Error fetching contact stats:", error);
			res.status(500).json({
				success: false,
				message: "Server error while fetching contact statistics",
			});
		}
	},
};

module.exports = ContactController;
