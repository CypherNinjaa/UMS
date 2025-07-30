import React, { useState } from "react";
import {
	Modal,
	Form,
	Button,
	Row,
	Col,
	Alert,
	InputGroup,
	Badge,
} from "react-bootstrap";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaGraduationCap,
	FaIdCard,
	FaUserTie,
	FaUserCheck,
} from "react-icons/fa";

const StudentFormModal = ({ show, onHide, student = null, onSave }) => {
	const isEdit = student !== null;

	// Helper to get today's date in YYYY-MM-DD format
	const getTodayDate = () => {
		return new Date().toISOString().split("T")[0];
	};

	// Helper to get a reasonable default birth date (18 years ago)
	const getDefaultBirthDate = () => {
		const date = new Date();
		date.setFullYear(date.getFullYear() - 18);
		return date.toISOString().split("T")[0];
	};

	const [formData, setFormData] = useState({
		studentId: student?.studentId || "",
		firstName: student?.firstName || "",
		lastName: student?.lastName || "",
		email: student?.email || "",
		phone: student?.phone || "",
		program: student?.program || "",
		year: student?.year || "1st Year",
		semester: student?.semester || "Fall 2024",
		status: student?.status || "Active",
		gpa: student?.gpa || "",
		credits: student?.credits || "",
		enrollmentDate: student?.enrollmentDate || getTodayDate(),
		dateOfBirth: student?.dateOfBirth || getDefaultBirthDate(),
		address: student?.address || "",
		guardianName: student?.guardianName || "",
		guardianPhone: student?.guardianPhone || "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const programs = [
		"Bachelor of Computer Science",
		"Master of Business Administration",
		"Bachelor of Biology",
		"Bachelor of Engineering",
		"Master of International Relations",
		"Certificate in Data Analytics",
		"Bachelor of Mathematics",
		"Bachelor of Physics",
		"Bachelor of Chemistry",
		"Master of Education",
	];

	const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
	const semesters = ["Fall 2024", "Spring 2025", "Summer 2025", "Fall 2025"];
	const statuses = ["Active", "On Leave", "Graduated", "Suspended", "Enrolled"];

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}

		// Auto-generate student ID for new students
		if (name === "firstName" || name === "lastName") {
			if (!isEdit && formData.firstName && formData.lastName) {
				const currentYear = new Date().getFullYear();
				const randomNum = Math.floor(Math.random() * 1000)
					.toString()
					.padStart(3, "0");
				setFormData((prev) => ({
					...prev,
					studentId: `STU${currentYear}${randomNum}`,
				}));
			}
		}

		// Auto-generate email for new students
		if (name === "firstName" || name === "lastName") {
			if (!isEdit && formData.firstName && formData.lastName) {
				const email = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@student.eduverse.edu`;
				setFormData((prev) => ({
					...prev,
					email: email,
				}));
			}
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		}

		if (!formData.program) {
			newErrors.program = "Program is required";
		}

		if (!formData.dateOfBirth) {
			newErrors.dateOfBirth = "Date of birth is required";
		}

		if (!formData.enrollmentDate) {
			newErrors.enrollmentDate = "Enrollment date is required";
		}

		if (!formData.address.trim()) {
			newErrors.address = "Address is required";
		}

		if (!formData.guardianName.trim()) {
			newErrors.guardianName = "Guardian name is required";
		}

		if (!formData.guardianPhone.trim()) {
			newErrors.guardianPhone = "Guardian phone is required";
		}

		// Validate GPA if provided
		if (
			formData.gpa &&
			(isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 4)
		) {
			newErrors.gpa = "GPA must be between 0.0 and 4.0";
		}

		// Validate credits if provided
		if (formData.credits && (isNaN(formData.credits) || formData.credits < 0)) {
			newErrors.credits = "Credits must be a positive number";
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
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const studentData = {
				...formData,
				gpa: parseFloat(formData.gpa) || 0,
				credits: parseInt(formData.credits) || 0,
			};

			// Only include ID for existing students being edited
			if (isEdit && student.id) {
				studentData.id = student.id;
			}

			onSave(studentData);
			handleClose();
		} catch (error) {
			console.error("Error saving student:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setFormData({
			studentId: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			program: "",
			year: "1st Year",
			semester: "Fall 2024",
			status: "Active",
			gpa: "",
			credits: "",
			enrollmentDate: getTodayDate(),
			dateOfBirth: getDefaultBirthDate(),
			address: "",
			guardianName: "",
			guardianPhone: "",
		});
		setErrors({});
		onHide();
	};

	const getStatusVariant = (status) => {
		const variants = {
			Active: "success",
			"On Leave": "warning",
			Graduated: "info",
			Suspended: "danger",
			Enrolled: "primary",
		};
		return variants[status] || "secondary";
	};

	return (
		<Modal size="lg" show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{isEdit ? "Edit Student Record" : "Add New Student"}
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					{/* Student ID and Status */}
					<Row className="mb-3">
						<Col md={6}>
							<Form.Group>
								<Form.Label>
									<FaIdCard className="me-2" />
									Student ID
								</Form.Label>
								<Form.Control
									type="text"
									name="studentId"
									value={formData.studentId}
									onChange={handleChange}
									placeholder="Auto-generated"
									readOnly={isEdit}
									isInvalid={!!errors.studentId}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.studentId}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group>
								<Form.Label>Status</Form.Label>
								<div className="d-flex align-items-center">
									<Form.Select
										name="status"
										value={formData.status}
										onChange={handleChange}
										className="me-2"
									>
										{statuses.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</Form.Select>
									<Badge bg={getStatusVariant(formData.status)}>
										{formData.status}
									</Badge>
								</div>
							</Form.Group>
						</Col>
					</Row>

					{/* Personal Information */}
					<h6 className="text-primary mb-3">
						<FaUser className="me-2" />
						Personal Information
					</h6>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>First Name *</Form.Label>
								<Form.Control
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									isInvalid={!!errors.firstName}
									placeholder="Enter first name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Last Name *</Form.Label>
								<Form.Control
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									isInvalid={!!errors.lastName}
									placeholder="Enter last name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.lastName}
								</Form.Control.Feedback>
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
									onChange={handleChange}
									isInvalid={!!errors.email}
									placeholder="student.email@eduverse.edu"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
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
									onChange={handleChange}
									isInvalid={!!errors.phone}
									placeholder="+1-555-0000"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.phone}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaCalendarAlt className="me-2" />
									Date of Birth *
								</Form.Label>
								<Form.Control
									type="date"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleChange}
									isInvalid={!!errors.dateOfBirth}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.dateOfBirth}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaCalendarAlt className="me-2" />
									Enrollment Date *
								</Form.Label>
								<Form.Control
									type="date"
									name="enrollmentDate"
									value={formData.enrollmentDate}
									onChange={handleChange}
									isInvalid={!!errors.enrollmentDate}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.enrollmentDate}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3">
						<Form.Label>
							<FaMapMarkerAlt className="me-2" />
							Address *
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={2}
							name="address"
							value={formData.address}
							onChange={handleChange}
							isInvalid={!!errors.address}
							placeholder="Full address including city, state, and ZIP code"
						/>
						<Form.Control.Feedback type="invalid">
							{errors.address}
						</Form.Control.Feedback>
					</Form.Group>

					{/* Academic Information */}
					<h6 className="text-primary mb-3 mt-4">
						<FaGraduationCap className="me-2" />
						Academic Information
					</h6>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Program *</Form.Label>
								<Form.Select
									name="program"
									value={formData.program}
									onChange={handleChange}
									isInvalid={!!errors.program}
								>
									<option value="">Select Program</option>
									{programs.map((program) => (
										<option key={program} value={program}>
											{program}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.program}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Academic Year</Form.Label>
								<Form.Select
									name="year"
									value={formData.year}
									onChange={handleChange}
								>
									{years.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col md={4}>
							<Form.Group className="mb-3">
								<Form.Label>Current Semester</Form.Label>
								<Form.Select
									name="semester"
									value={formData.semester}
									onChange={handleChange}
								>
									{semesters.map((semester) => (
										<option key={semester} value={semester}>
											{semester}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group className="mb-3">
								<Form.Label>Current GPA</Form.Label>
								<Form.Control
									type="number"
									step="0.01"
									min="0"
									max="4"
									name="gpa"
									value={formData.gpa}
									onChange={handleChange}
									isInvalid={!!errors.gpa}
									placeholder="0.00"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.gpa}
								</Form.Control.Feedback>
								<Form.Text className="text-muted">Scale: 0.0 - 4.0</Form.Text>
							</Form.Group>
						</Col>
						<Col md={4}>
							<Form.Group className="mb-3">
								<Form.Label>Total Credits</Form.Label>
								<Form.Control
									type="number"
									min="0"
									name="credits"
									value={formData.credits}
									onChange={handleChange}
									isInvalid={!!errors.credits}
									placeholder="0"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.credits}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					{/* Guardian Information */}
					<h6 className="text-primary mb-3 mt-4">
						<FaUserTie className="me-2" />
						Guardian/Emergency Contact
					</h6>
					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaUserCheck className="me-2" />
									Guardian Name *
								</Form.Label>
								<Form.Control
									type="text"
									name="guardianName"
									value={formData.guardianName}
									onChange={handleChange}
									isInvalid={!!errors.guardianName}
									placeholder="Guardian's full name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.guardianName}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>
									<FaPhone className="me-2" />
									Guardian Phone *
								</Form.Label>
								<Form.Control
									type="tel"
									name="guardianPhone"
									value={formData.guardianPhone}
									onChange={handleChange}
									isInvalid={!!errors.guardianPhone}
									placeholder="+1-555-0000"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.guardianPhone}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					{Object.keys(errors).length > 0 && (
						<Alert variant="danger" className="mt-3">
							Please correct the errors above before submitting.
						</Alert>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} disabled={loading}>
						Cancel
					</Button>
					<Button variant="primary" type="submit" disabled={loading}>
						{loading ? "Saving..." : isEdit ? "Update Student" : "Add Student"}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default StudentFormModal;
