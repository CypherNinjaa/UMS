import React, { useState, useEffect } from "react";
import {
	Modal,
	Form,
	Button,
	Row,
	Col,
	Alert,
	Spinner,
	Badge,
	InputGroup,
} from "react-bootstrap";
import {
	FaSave,
	FaTimes,
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaImage,
	FaTags,
} from "react-icons/fa";

const NewsEventForm = ({
	show,
	onHide,
	onSubmit,
	editData = null,
	loading = false,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		type: "News",
		category: "",
		description: "",
		content: "",
		author: "",
		publishDate: "",
		eventDate: "",
		eventTime: "",
		location: "",
		status: "Draft",
		featured: false,
		image: "",
		tags: [],
	});

	const [errors, setErrors] = useState({});
	const [newTag, setNewTag] = useState("");

	// Predefined categories
	const categories = [
		"Academic",
		"Research",
		"Technology",
		"Awards",
		"International",
		"Environment",
		"Sports",
		"Cultural",
		"Alumni",
		"Admissions",
		"Campus Life",
		"Community Service",
	];

	// Reset form when modal opens/closes or editData changes
	useEffect(() => {
		if (show) {
			if (editData) {
				setFormData({
					title: editData.title || "",
					type: editData.type || "News",
					category: editData.category || "",
					description: editData.description || "",
					content: editData.content || "",
					author: editData.author || "",
					publishDate: editData.publishDate || "",
					eventDate: editData.eventDate || "",
					eventTime: editData.eventTime || "",
					location: editData.location || "",
					status: editData.status || "Draft",
					featured: editData.featured || false,
					image: editData.image || "",
					tags: editData.tags || [],
				});
			} else {
				setFormData({
					title: "",
					type: "News",
					category: "",
					description: "",
					content: "",
					author: "",
					publishDate: new Date().toISOString().split("T")[0],
					eventDate: "",
					eventTime: "",
					location: "",
					status: "Draft",
					featured: false,
					image: "",
					tags: [],
				});
			}
			setErrors({});
			setNewTag("");
		}
	}, [show, editData]);

	// Strict validation handlers for text-only fields
	const handleTextInputChange = (e) => {
		const { name, value } = e.target;
		// Allow only letters, spaces, hyphens, apostrophes, and dots
		const textOnlyRegex = /^[a-zA-Z\s\-'.]*$/;
		if (textOnlyRegex.test(value)) {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Handler for numeric time inputs (hours and minutes)
	const handleTimeInputChange = (e) => {
		const { name, value } = e.target;
		// Allow only numbers and colons for time format
		const timeRegex = /^[0-9:]*$/;
		if (timeRegex.test(value)) {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Handler for alphanumeric fields (like tags, URLs)
	const handleAlphanumericInputChange = (e) => {
		const { name, value } = e.target;
		// Allow letters, numbers, spaces, and common punctuation
		const alphanumericRegex = /^[a-zA-Z0-9\s\-_.,!@#$%^&*()+=]*$/;
		if (alphanumericRegex.test(value)) {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Handler for general content that allows all characters
	const handleContentInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	// Handler for checkboxes and selects
	const handleSelectInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleAddTag = () => {
		if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
			setFormData((prev) => ({
				...prev,
				tags: [...prev.tags, newTag.trim()],
			}));
			setNewTag("");
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const validateForm = () => {
		const newErrors = {};

		// Title validation
		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		} else if (formData.title.trim().length < 3) {
			newErrors.title = "Title must be at least 3 characters";
		} else if (formData.title.trim().length > 255) {
			newErrors.title = "Title must be less than 255 characters";
		}

		// Category validation
		if (!formData.category) {
			newErrors.category = "Category is required";
		} else if (formData.category.length < 2) {
			newErrors.category = "Category must be at least 2 characters";
		} else if (formData.category.length > 100) {
			newErrors.category = "Category must be less than 100 characters";
		}

		// Description validation
		if (!formData.description.trim()) {
			newErrors.description = "Description is required";
		} else if (formData.description.trim().length < 10) {
			newErrors.description = "Description must be at least 10 characters";
		} else if (formData.description.trim().length > 1000) {
			newErrors.description = "Description must be less than 1000 characters";
		}

		// Content validation
		if (!formData.content.trim()) {
			newErrors.content = "Content is required";
		} else if (formData.content.trim().length < 20) {
			newErrors.content = "Content must be at least 20 characters";
		}

		// Author validation
		if (!formData.author.trim()) {
			newErrors.author = "Author is required";
		} else if (formData.author.trim().length < 2) {
			newErrors.author = "Author name must be at least 2 characters";
		} else if (formData.author.trim().length > 255) {
			newErrors.author = "Author name must be less than 255 characters";
		}

		// Publish date validation
		if (!formData.publishDate) {
			newErrors.publishDate = "Publish date is required";
		}

		// Validate event-specific fields
		if (formData.type === "Event") {
			if (!formData.eventDate) {
				newErrors.eventDate = "Event date is required for events";
			} else if (
				formData.publishDate &&
				new Date(formData.eventDate) < new Date(formData.publishDate)
			) {
				newErrors.eventDate = "Event date cannot be before publish date";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			// Clean up data before submission
			const submitData = {
				...formData,
				// Remove empty fields for events
				...(formData.type !== "Event" && {
					eventDate: null,
					eventTime: null,
					location: null,
				}),
			};

			onSubmit(submitData);
		}
	};

	const handleClose = () => {
		setFormData({
			title: "",
			type: "News",
			category: "",
			description: "",
			content: "",
			author: "",
			publishDate: "",
			eventDate: "",
			eventTime: "",
			location: "",
			status: "Draft",
			featured: false,
			image: "",
			tags: [],
		});
		setErrors({});
		setNewTag("");
		onHide();
	};

	return (
		<Modal size="lg" show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>
					{editData ? "Edit" : "Add New"} {formData.type}
				</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<Row>
						<Col md={8}>
							<Form.Group className="mb-3">
								<Form.Label>Title *</Form.Label>
								<Form.Control
									type="text"
									name="title"
									value={formData.title}
									onChange={handleAlphanumericInputChange}
									isInvalid={!!errors.title}
									placeholder="Enter title (3-255 characters)"
								/>
								<div className="d-flex justify-content-between">
									<Form.Control.Feedback type="invalid">
										{errors.title}
									</Form.Control.Feedback>
									<Form.Text className="text-muted">
										{formData.title.length}/255 characters
									</Form.Text>
								</div>
								<Form.Text className="text-muted small">
									Title can contain letters, numbers, and punctuation
								</Form.Text>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group className="mb-3">
								<Form.Label>Type *</Form.Label>
								<Form.Select
									name="type"
									value={formData.type}
									onChange={handleSelectInputChange}
								>
									<option value="News">News</option>
									<option value="Event">Event</option>
									<option value="Announcement">Announcement</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Category *</Form.Label>
								<Form.Select
									name="category"
									value={formData.category}
									onChange={handleSelectInputChange}
									isInvalid={!!errors.category}
								>
									<option value="">Select Category</option>
									{categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.category}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Author *</Form.Label>
								<Form.Control
									type="text"
									name="author"
									value={formData.author}
									onChange={handleTextInputChange}
									isInvalid={!!errors.author}
									placeholder="Enter author name (2-255 characters)"
								/>
								<div className="d-flex justify-content-between">
									<Form.Control.Feedback type="invalid">
										{errors.author}
									</Form.Control.Feedback>
									<Form.Text className="text-muted">
										{formData.author.length}/255 characters
									</Form.Text>
								</div>
								<Form.Text className="text-muted small">
									Author name can only contain letters and spaces
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group className="mb-3">
						<Form.Label>Description *</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="description"
							value={formData.description}
							onChange={handleContentInputChange}
							isInvalid={!!errors.description}
							placeholder="Enter a brief description (10-1000 characters)"
						/>
						<div className="d-flex justify-content-between">
							<Form.Control.Feedback type="invalid">
								{errors.description}
							</Form.Control.Feedback>
							<Form.Text className="text-muted">
								{formData.description.length}/1000 characters
							</Form.Text>
						</div>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Content *</Form.Label>
						<Form.Control
							as="textarea"
							rows={6}
							name="content"
							value={formData.content}
							onChange={handleContentInputChange}
							isInvalid={!!errors.content}
							placeholder="Enter the full content (minimum 20 characters)"
						/>
						<div className="d-flex justify-content-between">
							<Form.Control.Feedback type="invalid">
								{errors.content}
							</Form.Control.Feedback>
							<Form.Text className="text-muted">
								{formData.content.length} characters (minimum 20)
							</Form.Text>
						</div>
					</Form.Group>{" "}
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaCalendarAlt className="me-2" />
									Publish Date *
								</Form.Label>
								<Form.Control
									type="date"
									name="publishDate"
									value={formData.publishDate}
									onChange={handleSelectInputChange}
									isInvalid={!!errors.publishDate}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.publishDate}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Status</Form.Label>
								<Form.Select
									name="status"
									value={formData.status}
									onChange={handleSelectInputChange}
								>
									<option value="Draft">Draft</option>
									<option value="Published">Published</option>
									<option value="Scheduled">Scheduled</option>
									<option value="Archived">Archived</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					{/* Event-specific fields */}
					{formData.type === "Event" && (
						<>
							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											<FaCalendarAlt className="me-2" />
											Event Date *
										</Form.Label>
										<Form.Control
											type="date"
											name="eventDate"
											value={formData.eventDate}
											onChange={handleSelectInputChange}
											isInvalid={!!errors.eventDate}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.eventDate}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											<FaClock className="me-2" />
											Event Time
										</Form.Label>
										<Form.Control
											type="time"
											name="eventTime"
											value={formData.eventTime}
											onChange={handleTimeInputChange}
										/>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>
									<FaMapMarkerAlt className="me-2" />
									Location
								</Form.Label>
								<Form.Control
									type="text"
									name="location"
									value={formData.location}
									onChange={handleAlphanumericInputChange}
									placeholder="Enter event location"
								/>
								<Form.Text className="text-muted small">
									Location can contain letters, numbers, and common punctuation
								</Form.Text>
							</Form.Group>
						</>
					)}
					<Form.Group className="mb-3">
						<Form.Label>
							<FaImage className="me-2" />
							Image URL
						</Form.Label>
						<Form.Control
							type="url"
							name="image"
							value={formData.image}
							onChange={handleAlphanumericInputChange}
							placeholder="Enter image URL (optional)"
						/>
					</Form.Group>
					{/* Tags */}
					<Form.Group className="mb-3">
						<Form.Label>
							<FaTags className="me-2" />
							Tags
						</Form.Label>
						<InputGroup className="mb-2">
							<Form.Control
								type="text"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								placeholder="Add a tag"
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddTag();
									}
								}}
							/>
							<Button variant="outline-secondary" onClick={handleAddTag}>
								Add
							</Button>
						</InputGroup>
						<div>
							{formData.tags.map((tag, index) => (
								<Badge
									key={index}
									bg="secondary"
									className="me-2 mb-1"
									style={{ cursor: "pointer" }}
									onClick={() => handleRemoveTag(tag)}
								>
									{tag} ×
								</Badge>
							))}
						</div>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Check
							type="checkbox"
							name="featured"
							label="Featured Item"
							checked={formData.featured}
							onChange={handleSelectInputChange}
						/>
					</Form.Group>
					{Object.keys(errors).length > 0 && (
						<Alert variant="danger">
							<small>Please fix the errors above before submitting.</small>
						</Alert>
					)}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} disabled={loading}>
						<FaTimes className="me-2" />
						Cancel
					</Button>
					<Button type="submit" variant="primary" disabled={loading}>
						{loading ? (
							<>
								<Spinner size="sm" className="me-2" />
								{editData ? "Updating..." : "Creating..."}
							</>
						) : (
							<>
								<FaSave className="me-2" />
								{editData ? "Update" : "Create"} {formData.type}
							</>
						)}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default NewsEventForm;
