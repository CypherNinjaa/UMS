import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaBriefcase,
	FaUniversity,
	FaStar,
	FaCalendarAlt,
	FaImage,
	FaTimes,
	FaKey,
	FaUserPlus,
} from "react-icons/fa";

const FacultyFormModal = ({
	show,
	onHide,
	faculty = null,
	onSave,
	onSuccess,
}) => {
	const isEdit = faculty !== null;

	const [formData, setFormData] = useState({
		name: "",
		title: "",
		department: "",
		specialization: "",
		email: "",
		phone: "+91",
		status: "Active",
		joinDate: "",
		featured: false,
		profileImage: "",
		// Login credentials
		createLogin: !isEdit, // Auto-check for new faculty
		password: "faculty123",
		confirmPassword: "faculty123",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [imageLoading, setImageLoading] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [saveSuccess, setSaveSuccess] = useState(false);

	// Update form data when faculty prop changes
	useEffect(() => {
		if (faculty) {
			// Format the joinDate to YYYY-MM-DD for the input field
			const formatDate = (dateString) => {
				if (!dateString) return "";
				const date = new Date(dateString);
				return date.toISOString().split("T")[0];
			};

			setFormData({
				name: faculty.name || "",
				title: faculty.title || "",
				department: faculty.department || "",
				specialization: faculty.specialization || "",
				email: faculty.email || "",
				phone: faculty.phone || "+91",
				status: faculty.status || "Active",
				joinDate: formatDate(faculty.joinDate),
				featured: faculty.featured || false,
				profileImage: faculty.profileImage || "",
				// Login credentials - don't populate for existing faculty
				createLogin: false, // Don't auto-create for existing faculty
				password: "faculty123",
				confirmPassword: "faculty123",
			});

			// Set image preview if there's an existing image
			setImagePreview(faculty.profileImage || null);
			setSelectedFile(null);
		} else {
			// Reset form for new faculty
			setFormData({
				name: "",
				title: "",
				department: "",
				specialization: "",
				email: "",
				phone: "+91",
				status: "Active",
				joinDate: "",
				featured: false,
				profileImage: "",
				// Login credentials
				createLogin: true, // Auto-check for new faculty
				password: "faculty123",
				confirmPassword: "faculty123",
			});
			setImagePreview(null);
			setSelectedFile(null);
		}
		// Clear errors when modal opens/closes or faculty changes
		setErrors({});
		setSaveSuccess(false);
	}, [faculty, show]);

	// Add useEffect to handle successful save
	useEffect(() => {
		if (saveSuccess) {
			console.log("Faculty saved successfully, triggering parent refresh...");
			// Reset the success flag
			setSaveSuccess(false);
		}
	}, [saveSuccess]);

	const departments = [
		"Computer Science",
		"Business Administration",
		"Biology",
		"Engineering",
		"Political Science",
		"Mathematics",
		"Physics",
		"Chemistry",
		"English",
		"History",
	];

	const statuses = ["Active", "Inactive", "Pending"];

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

	// Handler for alphanumeric fields (title, specialization)
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

	// Handler for email fields
	const handleEmailInputChange = (e) => {
		const { name, value } = e.target;
		// Allow email-valid characters
		const emailRegex = /^[a-zA-Z0-9@._-]*$/;
		if (emailRegex.test(value)) {
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

	// Handler for phone number with +91 prefix
	const handlePhoneInputChange = (e) => {
		const { name, value } = e.target;

		// Remove any non-digit characters except +
		let cleanValue = value.replace(/[^\d+]/g, "");

		// Ensure it starts with +91
		if (!cleanValue.startsWith("+91")) {
			cleanValue = "+91";
		}

		// Limit to +91 + 10 digits = 13 characters total
		if (cleanValue.length > 13) {
			cleanValue = cleanValue.substring(0, 13);
		}

		// Only allow numbers after +91
		const phoneRegex = /^\+91\d{0,10}$/;
		if (phoneRegex.test(cleanValue)) {
			setFormData((prev) => ({
				...prev,
				[name]: cleanValue,
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

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Validate file type
			const allowedTypes = [
				"image/jpeg",
				"image/jpg",
				"image/png",
				"image/gif",
			];
			if (!allowedTypes.includes(file.type)) {
				setErrors((prev) => ({
					...prev,
					profileImage: "Please select a valid image file (JPEG, PNG, or GIF)",
				}));
				return;
			}

			// Validate file size (max 5MB)
			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.size > maxSize) {
				setErrors((prev) => ({
					...prev,
					profileImage: "Image size should be less than 5MB",
				}));
				return;
			}

			setSelectedFile(file);
			setImageLoading(true);

			// Create and compress image
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					// Create canvas for compression
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");

					// Set maximum dimensions
					const maxWidth = 400;
					const maxHeight = 400;
					let { width, height } = img;

					// Calculate new dimensions
					if (width > height) {
						if (width > maxWidth) {
							height = (height * maxWidth) / width;
							width = maxWidth;
						}
					} else {
						if (height > maxHeight) {
							width = (width * maxHeight) / height;
							height = maxHeight;
						}
					}

					// Set canvas size and draw image
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);

					// Convert to compressed base64
					const compressedImage = canvas.toDataURL("image/jpeg", 0.7);

					setImagePreview(compressedImage);
					setFormData((prev) => ({
						...prev,
						profileImage: compressedImage,
					}));
					setImageLoading(false);
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);

			// Clear any previous errors
			if (errors.profileImage) {
				setErrors((prev) => ({ ...prev, profileImage: "" }));
			}
		}
	};

	const removeImage = () => {
		setImagePreview(null);
		setSelectedFile(null);
		setImageLoading(false);
		setFormData((prev) => ({
			...prev,
			profileImage: "",
		}));
		// Reset the file input
		const fileInput = document.querySelector('input[name="profileImage"]');
		if (fileInput) {
			fileInput.value = "";
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Full name is required";
		} else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
			newErrors.name = "Name can contain only letters and spaces";
		}

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		}

		if (!formData.department) {
			newErrors.department = "Department is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		} else if (!/^\+91\d{10}$/.test(formData.phone)) {
			newErrors.phone =
				"Phone number must be in format +91 followed by 10 digits";
		}

		if (!formData.joinDate) {
			newErrors.joinDate = "Join date is required";
		}

		if (formData.createLogin) {
			if (!formData.loginEmail.trim()) {
				newErrors.loginEmail = "Login email is required";
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.loginEmail)) {
				newErrors.loginEmail = "Please enter a valid login email address";
			}

			if (!formData.password.trim()) {
				newErrors.password = "Password is required";
			} else if (
				formData.password.length < 6 ||
				!/[a-zA-Z]/.test(formData.password) ||
				!/\d/.test(formData.password)
			) {
				newErrors.password =
					"Password must be at least 6 characters and contain letters and numbers";
			}

			if (!formData.confirmPassword.trim()) {
				newErrors.confirmPassword = "Please confirm the password";
			} else if (formData.password !== formData.confirmPassword) {
				newErrors.confirmPassword = "Passwords do not match";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setLoading(true);

		try {
			const facultyData = {
				...formData,
				id: isEdit ? faculty.id : Date.now(),
				loginEmail: formData.createLogin ? formData.email : undefined,
			};

			// Call the onSave function which will handle the actual API call
			await onSave(facultyData);

			// Mark save as successful
			setSaveSuccess(true);

			// Call onSuccess callback to trigger refresh in parent component
			if (onSuccess) {
				await onSuccess();
			}

			handleClose();
		} catch (error) {
			console.error("Error saving faculty:", error);
			// Show error to user (you might want to add error state for this)
			alert("Error saving faculty: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({
			name: "",
			title: "",
			department: "",
			specialization: "",
			email: "",
			phone: "+91",
			status: "Active",
			joinDate: "",
			featured: false,
			profileImage: "",
			// Login credentials
			createLogin: true,
			password: "faculty123",
			confirmPassword: "faculty123",
		});
		setErrors({});
		setImagePreview(null);
		setSelectedFile(null);
		setImageLoading(false);
		onHide();
	};

	return (
		<Modal size="lg" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{isEdit ? "Edit Faculty Member" : "Add New Faculty Member"}
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaUser className="me-2" />
									Full Name *
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={formData.name}
									onChange={handleTextInputChange}
									isInvalid={!!errors.name}
									placeholder="Enter full name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
								<Form.Text className="text-muted small">
									Name can only contain letters and spaces
								</Form.Text>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaBriefcase className="me-2" />
									Title/Position *
								</Form.Label>
								<Form.Control
									type="text"
									name="title"
									value={formData.title}
									onChange={handleAlphanumericInputChange}
									isInvalid={!!errors.title}
									placeholder="e.g., Professor of Computer Science"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.title}
								</Form.Control.Feedback>
								<Form.Text className="text-muted small">
									Title can contain letters, numbers, and punctuation
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaUniversity className="me-2" />
									Department *
								</Form.Label>
								<Form.Select
									name="department"
									value={formData.department}
									onChange={handleSelectInputChange}
									isInvalid={!!errors.department}
								>
									<option value="">Select Department</option>
									{departments.map((dept) => (
										<option key={dept} value={dept}>
											{dept}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.department}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaStar className="me-2" />
									Specialization
								</Form.Label>
								<Form.Control
									type="text"
									name="specialization"
									value={formData.specialization}
									onChange={handleAlphanumericInputChange}
									placeholder="e.g., Machine Learning, AI"
								/>
								<Form.Text className="text-muted small">
									Specialization can contain letters, numbers, and punctuation
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaImage className="me-2" />
									Profile Image
								</Form.Label>
								<div className="d-flex flex-column">
									{imagePreview ? (
										<div className="mb-3">
											<div className="position-relative d-inline-block">
												<img
													src={imagePreview}
													alt="Preview"
													style={{
														width: "120px",
														height: "120px",
														objectFit: "cover",
														borderRadius: "8px",
														border: "2px solid #dee2e6",
													}}
												/>
												<Button
													variant="danger"
													size="sm"
													className="position-absolute top-0 end-0 rounded-circle"
													style={{
														width: "30px",
														height: "30px",
														transform: "translate(50%, -50%)",
													}}
													onClick={removeImage}
												>
													<FaTimes size={12} />
												</Button>
											</div>
											<div className="mt-2">
												<small className="text-muted">
													{selectedFile ? selectedFile.name : "Current image"}
												</small>
											</div>
										</div>
									) : (
										<div
											className="border-2 border-dashed border-secondary rounded p-4 text-center mb-3"
											style={{ backgroundColor: "#f8f9fa" }}
										>
											{imageLoading ? (
												<>
													<div
														className="spinner-border text-primary mb-2"
														role="status"
													>
														<span className="visually-hidden">Loading...</span>
													</div>
													<p className="text-muted mb-0">Processing image...</p>
												</>
											) : (
												<>
													<FaImage size={24} className="text-muted mb-2" />
													<p className="text-muted mb-2">No image selected</p>
													<small className="text-muted">
														Upload a profile image (JPEG, PNG, or GIF - Max 5MB)
													</small>
												</>
											)}
										</div>
									)}
									<Form.Control
										type="file"
										name="profileImage"
										accept="image/*"
										onChange={handleImageChange}
										isInvalid={!!errors.profileImage}
										disabled={imageLoading || loading}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.profileImage}
									</Form.Control.Feedback>
									<Form.Text className="text-muted">
										Recommended size: 300x300 pixels. Maximum file size: 5MB.
									</Form.Text>
								</div>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaEnvelope className="me-2" />
									Email Address *
								</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={formData.email}
									onChange={handleEmailInputChange}
									isInvalid={!!errors.email}
									placeholder="email@eduverse.edu"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
								<Form.Text className="text-muted small">
									Enter a valid email address
								</Form.Text>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaPhone className="me-2" />
									Phone Number *
								</Form.Label>
								<Form.Control
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handlePhoneInputChange}
									isInvalid={!!errors.phone}
									placeholder="+91 followed by 10 digits"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.phone}
								</Form.Control.Feedback>
								<Form.Text className="text-muted small">
									Format: +91 followed by exactly 10 digits
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Status</Form.Label>
								<Form.Select
									name="status"
									value={formData.status}
									onChange={handleSelectInputChange}
								>
									{statuses.map((status) => (
										<option key={status} value={status}>
											{status}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaCalendarAlt className="me-2" />
									Join Date *
								</Form.Label>
								<Form.Control
									type="date"
									name="joinDate"
									value={formData.joinDate}
									onChange={handleSelectInputChange}
									isInvalid={!!errors.joinDate}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.joinDate}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Form.Group className="mb-3">
								<Form.Check
									type="checkbox"
									name="featured"
									checked={formData.featured}
									onChange={handleSelectInputChange}
									label="Mark as Distinguished Faculty"
								/>
								<Form.Text className="text-muted">
									Distinguished faculty will be highlighted on the website
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					{/* Login Credentials Section */}
					<hr className="my-4" />
					<Row>
						<Col md={12}>
							<h5 className="mb-3">
								<FaUserPlus className="me-2 text-primary" />
								Login Credentials
							</h5>
						</Col>
					</Row>

					<Row>
						<Col md={12}>
							<Form.Group className="mb-3">
								<Form.Check
									type="checkbox"
									name="createLogin"
									checked={formData.createLogin}
									onChange={handleSelectInputChange}
									label={
										<span>
											<FaKey className="me-2" />
											{isEdit
												? "Create/Update Login Account for Faculty"
												: "Create Login Account for Faculty"}
										</span>
									}
								/>
								<Form.Text className="text-muted">
									{isEdit
										? "Enable to create or update login credentials for this faculty member"
										: "Faculty will be able to login to the Faculty Dashboard"}
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

					{formData.createLogin && (
						<>
							<Row>
								<Col md={12}>
									<div className="alert alert-info">
										<strong>Login Details:</strong>
										<br />
										<small>
											<strong>Email:</strong>{" "}
											{formData.email || "Will use faculty email"}
											<br />
											<strong>Default Password:</strong> faculty123
										</small>
										<br />
										<small className="text-muted">
											Faculty can login with their email address and the default
											password "faculty123". They should change this password
											after first login.
										</small>
									</div>
								</Col>
							</Row>
						</>
					)}

					{Object.keys(errors).length > 0 && (
						<Alert variant="danger">
							Please correct the errors above before submitting.
						</Alert>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} disabled={loading}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" disabled={loading}>
						{loading ? "Saving..." : isEdit ? "Update Faculty" : "Add Faculty"}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default FacultyFormModal;
