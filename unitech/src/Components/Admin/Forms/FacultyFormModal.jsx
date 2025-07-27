import React, { useState } from "react";
import {
	Modal,
	Form,
	Button,
	Row,
	Col,
	Alert,
	InputGroup,
} from "react-bootstrap";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaBriefcase,
	FaUniversity,
	FaStar,
	FaCalendarAlt,
} from "react-icons/fa";

const FacultyFormModal = ({ show, onHide, faculty = null, onSave }) => {
	const isEdit = faculty !== null;

	const [formData, setFormData] = useState({
		name: faculty?.name || "",
		title: faculty?.title || "",
		department: faculty?.department || "",
		specialization: faculty?.specialization || "",
		email: faculty?.email || "",
		phone: faculty?.phone || "",
		status: faculty?.status || "Active",
		joinDate: faculty?.joinDate || "",
		featured: faculty?.featured || false,
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

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
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Full name is required";
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
		}

		if (!formData.joinDate) {
			newErrors.joinDate = "Join date is required";
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

			const facultyData = {
				...formData,
				id: isEdit ? faculty.id : Date.now(),
			};

			onSave(facultyData);
			handleClose();
		} catch (error) {
			console.error("Error saving faculty:", error);
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
			phone: "",
			status: "Active",
			joinDate: "",
			featured: false,
		});
		setErrors({});
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
									onChange={handleChange}
									isInvalid={!!errors.name}
									placeholder="Enter full name"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
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
									onChange={handleChange}
									isInvalid={!!errors.title}
									placeholder="e.g., Professor of Computer Science"
								/>
								<Form.Control.Feedback type="invalid">
									{errors.title}
								</Form.Control.Feedback>
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
									onChange={handleChange}
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
									onChange={handleChange}
									placeholder="e.g., Machine Learning, AI"
								/>
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
									placeholder="email@eduverse.edu"
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
								<Form.Label>Status</Form.Label>
								<Form.Select
									name="status"
									value={formData.status}
									onChange={handleChange}
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
									onChange={handleChange}
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
									onChange={handleChange}
									label="Mark as Distinguished Faculty"
								/>
								<Form.Text className="text-muted">
									Distinguished faculty will be highlighted on the website
								</Form.Text>
							</Form.Group>
						</Col>
					</Row>

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
