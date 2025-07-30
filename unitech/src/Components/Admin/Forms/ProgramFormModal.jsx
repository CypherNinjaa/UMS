import React, { useState, useEffect } from "react";
import {
	Modal,
	Form,
	Button,
	Row,
	Col,
	Alert,
	Spinner,
	InputGroup,
	Badge,
} from "react-bootstrap";
import { FaSave, FaTimes, FaCalendar, FaRupeeSign } from "react-icons/fa";

const ProgramFormModal = ({ show, onHide, program, onSave, onSuccess }) => {
	const [formData, setFormData] = useState({
		name: "",
		code: "",
		type: "Undergraduate",
		duration: "",
		credits: "",
		department: "",
		description: "",
		requirements: "",
		status: "Planning",
		capacity: "",
		tuitionFee: "",
		startDate: "",
		endDate: "",
		objectives: "",
		outcomes: "",
		prerequisites: "",
		applicationDeadline: "",
		isOnline: false,
		accreditation: "",
		careerProspects: "",
		featured: false,
	});

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);

	// Program types
	const programTypes = [
		"Undergraduate",
		"Graduate",
		"Certificate",
		"Diploma",
		"Doctorate",
	];

	// Program statuses
	const programStatuses = [
		"Active",
		"Inactive",
		"Planning",
		"Suspended",
		"Completed",
	];

	// Common departments
	const departments = [
		"Computer Science",
		"Engineering",
		"Business Administration",
		"Medicine",
		"Law",
		"Education",
		"Arts & Sciences",
		"Architecture",
		"Nursing",
		"Psychology",
		"Biology",
		"Chemistry",
		"Physics",
		"Mathematics",
		"Economics",
		"Political Science",
		"English",
		"History",
		"Philosophy",
		"Other",
	];

	// Initialize form data when program prop changes
	useEffect(() => {
		if (program) {
			setFormData({
				name: program.name || "",
				code: program.code || "",
				type: program.type || "Undergraduate",
				duration: program.duration || "",
				credits: program.credits || "",
				department: program.department || "",
				description: program.description || "",
				requirements: program.requirements || "",
				status: program.status || "Planning",
				capacity: program.capacity || "",
				tuitionFee: program.tuitionFee || "",
				startDate: program.startDate
					? new Date(program.startDate).toISOString().split("T")[0]
					: "",
				endDate: program.endDate
					? new Date(program.endDate).toISOString().split("T")[0]
					: "",
				objectives: program.objectives || "",
				outcomes: program.outcomes || "",
				prerequisites: program.prerequisites || "",
				applicationDeadline: program.applicationDeadline
					? new Date(program.applicationDeadline).toISOString().split("T")[0]
					: "",
				isOnline: program.isOnline || false,
				accreditation: program.accreditation || "",
				careerProspects: program.careerProspects || "",
				featured: program.featured || false,
			});
		} else {
			// Reset form for new program
			setFormData({
				name: "",
				code: "",
				type: "Undergraduate",
				duration: "",
				credits: "",
				department: "",
				description: "",
				requirements: "",
				status: "Planning",
				capacity: "",
				tuitionFee: "",
				startDate: "",
				endDate: "",
				objectives: "",
				outcomes: "",
				prerequisites: "",
				applicationDeadline: "",
				isOnline: false,
				accreditation: "",
				careerProspects: "",
				featured: false,
			});
		}
		setErrors({});
		setSaveSuccess(false);
	}, [program, show]);

	// Add useEffect to handle successful save
	useEffect(() => {
		if (saveSuccess) {
			console.log("Program saved successfully, triggering parent refresh...");
			// Reset the success flag
			setSaveSuccess(false);
		}
	}, [saveSuccess]);

	// Improved input handlers with validation
	const handleTextInputChange = (e) => {
		const { name, value } = e.target;
		// Only allow letters, spaces, hyphens, apostrophes, and basic punctuation (NO NUMBERS)
		const textRegex = /^[a-zA-Z\s\-'.,&()]*$/;

		if (textRegex.test(value) || value === "") {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({
					...prev,
					[name]: "",
				}));
			}
		}
	};

	const handleProgramNameInputChange = (e) => {
		const { name, value } = e.target;
		// Allow letters, numbers, spaces, and common punctuation for program names
		const programNameRegex = /^[a-zA-Z0-9\s\-'.,&()]*$/;

		if (programNameRegex.test(value) || value === "") {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({
					...prev,
					[name]: "",
				}));
			}
		}
	};

	const handleNumberInputChange = (e) => {
		const { name, value } = e.target;
		// Only allow positive numbers (integers and decimals)
		const numberRegex = /^[0-9]*\.?[0-9]*$/;

		// Prevent input if it's not a valid number format
		if (value !== "" && !numberRegex.test(value)) {
			return; // Don't update state if invalid format
		}

		// Prevent multiple decimal points
		if (value.includes(".") && (value.match(/\./g) || []).length > 1) {
			return;
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleIntegerInputChange = (e) => {
		const { name, value } = e.target;
		// Only allow positive integers (no decimals)
		const integerRegex = /^[0-9]*$/;

		// Prevent input if it's not a valid integer format
		if (value !== "" && !integerRegex.test(value)) {
			return; // Don't update state if invalid format
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const handleDurationInputChange = (e) => {
		const { name, value } = e.target;
		// Allow numbers, letters, and spaces for duration (e.g., "4 years", "2 semesters")
		const durationRegex = /^[a-zA-Z0-9\s]*$/;

		if (durationRegex.test(value) || value === "") {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));

			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({
					...prev,
					[name]: "",
				}));
			}
		}
	};

	const handleCodeInputChange = (e) => {
		const { name, value } = e.target;
		// Only allow uppercase letters and numbers for program codes
		const codeRegex = /^[A-Z0-9]*$/;

		if (codeRegex.test(value.toUpperCase()) || value === "") {
			setFormData((prev) => ({
				...prev,
				[name]: value.toUpperCase(),
			}));

			// Clear error for this field when user starts typing
			if (errors[name]) {
				setErrors((prev) => ({
					...prev,
					[name]: "",
				}));
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));

		// Clear error for this field when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Required field validations
		if (!formData.name.trim()) newErrors.name = "Program name is required";
		if (!formData.code.trim()) newErrors.code = "Program code is required";
		if (!formData.duration.trim()) newErrors.duration = "Duration is required";
		if (!formData.credits) newErrors.credits = "Credits are required";
		if (!formData.department.trim())
			newErrors.department = "Department is required";
		if (!formData.description.trim())
			newErrors.description = "Description is required";
		if (!formData.startDate) newErrors.startDate = "Start date is required";
		if (!formData.capacity) newErrors.capacity = "Capacity is required";

		// Numeric validations
		if (
			formData.credits &&
			(isNaN(formData.credits) || parseInt(formData.credits) < 1)
		) {
			newErrors.credits = "Credits must be a positive number";
		}
		if (
			formData.capacity &&
			(isNaN(formData.capacity) || parseInt(formData.capacity) < 1)
		) {
			newErrors.capacity = "Capacity must be a positive number";
		}
		if (
			formData.tuitionFee &&
			(isNaN(formData.tuitionFee) || parseFloat(formData.tuitionFee) < 0)
		) {
			newErrors.tuitionFee = "Tuition fee must be a positive number";
		}

		// Date validations
		if (
			formData.endDate &&
			formData.startDate &&
			new Date(formData.endDate) <= new Date(formData.startDate)
		) {
			newErrors.endDate = "End date must be after start date";
		}

		// Code format validation
		if (formData.code && !/^[A-Z0-9]+$/.test(formData.code)) {
			newErrors.code =
				"Program code must contain only uppercase letters and numbers";
		}

		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsSubmitting(true);

		try {
			// Prepare data for submission with proper field mapping
			const submitData = {
				name: formData.name,
				code: formData.code.toUpperCase(),
				type: formData.type,
				duration: formData.duration,
				credits: parseInt(formData.credits),
				department: formData.department,
				description: formData.description,
				requirements: formData.requirements || "",
				status: formData.status,
				capacity: parseInt(formData.capacity),
				currentEnrollment: 0, // Default to 0 for new programs
				tuitionFee: formData.tuitionFee
					? parseFloat(formData.tuitionFee)
					: null,
				startDate: formData.startDate,
				endDate: formData.endDate || null,
				featured: formData.featured || false,
				rating: null, // Default to null for new programs (will be calculated later)
				objectives: formData.objectives || null,
				outcomes: formData.outcomes || null,
				facultyAssigned: null, // Will be assigned separately
				prerequisites: formData.prerequisites || null,
				applicationDeadline: formData.applicationDeadline || null,
				programImage: null, // Will be handled separately if needed
				isOnline: formData.isOnline || false,
				accreditation: formData.accreditation || null,
				careerProspects: formData.careerProspects || null,
			};

			await onSave(submitData);

			// Mark save as successful
			setSaveSuccess(true);

			// Call onSuccess callback to trigger refresh in parent component
			if (onSuccess) {
				await onSuccess();
			}

			onHide();
		} catch (error) {
			setErrors({ submit: error.message || "Failed to save program" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		setFormData({});
		setErrors({});
		onHide();
	};

	return (
		<Modal size="xl" show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>
					{program ? "Edit Program" : "Add New Program"}
				</Modal.Title>
			</Modal.Header>

			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					{errors.submit && (
						<Alert variant="danger" className="mb-3">
							{errors.submit}
						</Alert>
					)}

					<Row>
						{/* Basic Information */}
						<Col md={6}>
							<h6 className="mb-3 text-primary">Basic Information</h6>

							<Form.Group className="mb-3">
								<Form.Label>
									Program Name <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={formData.name}
									onChange={handleProgramNameInputChange}
									isInvalid={!!errors.name}
									placeholder="e.g., Bachelor of Computer Science"
								/>
								<Form.Text className="text-muted">
									Letters, numbers, and common punctuation allowed
								</Form.Text>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Program Code <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="code"
											value={formData.code}
											onChange={handleCodeInputChange}
											isInvalid={!!errors.code}
											placeholder="e.g., BCS"
											style={{ textTransform: "uppercase" }}
										/>
										<Form.Text className="text-muted">
											Only uppercase letters and numbers allowed
										</Form.Text>
										<Form.Control.Feedback type="invalid">
											{errors.code}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Program Type <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="type"
											value={formData.type}
											onChange={handleInputChange}
											isInvalid={!!errors.type}
										>
											{programTypes.map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.type}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
							</Row>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Duration <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="duration"
											value={formData.duration}
											onChange={handleDurationInputChange}
											isInvalid={!!errors.duration}
											placeholder="e.g., 4 years"
										/>
										<Form.Control.Feedback type="invalid">
											{errors.duration}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Credits <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="credits"
											value={formData.credits}
											onChange={handleIntegerInputChange}
											isInvalid={!!errors.credits}
											placeholder="120"
										/>
										<Form.Text className="text-muted">
											Integers only (no decimals)
										</Form.Text>
										<Form.Control.Feedback type="invalid">
											{errors.credits}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>
									Department <span className="text-danger">*</span>
								</Form.Label>
								<Form.Select
									name="department"
									value={formData.department}
									onChange={handleInputChange}
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

							<Form.Group className="mb-3">
								<Form.Label>
									Description <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									name="description"
									value={formData.description}
									onChange={handleInputChange}
									isInvalid={!!errors.description}
									placeholder="Provide a comprehensive description of the program..."
								/>
								<Form.Control.Feedback type="invalid">
									{errors.description}
								</Form.Control.Feedback>
							</Form.Group>
						</Col>

						{/* Program Details */}
						<Col md={6}>
							<h6 className="mb-3 text-primary">Program Details</h6>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Status <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="status"
											value={formData.status}
											onChange={handleInputChange}
										>
											{programStatuses.map((status) => (
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
											Capacity <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="text"
											name="capacity"
											value={formData.capacity}
											onChange={handleIntegerInputChange}
											isInvalid={!!errors.capacity}
											placeholder="100"
										/>
										<Form.Text className="text-muted">
											Integers only (no decimals)
										</Form.Text>
										<Form.Control.Feedback type="invalid">
											{errors.capacity}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>Tuition Fee (Annual)</Form.Label>
								<InputGroup>
									<InputGroup.Text>
										<FaRupeeSign />
									</InputGroup.Text>
									<Form.Control
										type="text"
										name="tuitionFee"
										value={formData.tuitionFee}
										onChange={handleNumberInputChange}
										isInvalid={!!errors.tuitionFee}
										placeholder="25000"
									/>
									<Form.Control.Feedback type="invalid">
										{errors.tuitionFee}
									</Form.Control.Feedback>
								</InputGroup>
								<Form.Text className="text-muted">
									Enter amount in Indian Rupees (numbers and decimals allowed)
								</Form.Text>
							</Form.Group>

							<Row>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Start Date <span className="text-danger">*</span>
										</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FaCalendar />
											</InputGroup.Text>
											<Form.Control
												type="date"
												name="startDate"
												value={formData.startDate}
												onChange={handleInputChange}
												isInvalid={!!errors.startDate}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.startDate}
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Col>
								<Col md={6}>
									<Form.Group className="mb-3">
										<Form.Label>End Date</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FaCalendar />
											</InputGroup.Text>
											<Form.Control
												type="date"
												name="endDate"
												value={formData.endDate}
												onChange={handleInputChange}
												isInvalid={!!errors.endDate}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.endDate}
											</Form.Control.Feedback>
										</InputGroup>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>Application Deadline</Form.Label>
								<InputGroup>
									<InputGroup.Text>
										<FaCalendar />
									</InputGroup.Text>
									<Form.Control
										type="date"
										name="applicationDeadline"
										value={formData.applicationDeadline}
										onChange={handleInputChange}
									/>
								</InputGroup>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Admission Requirements</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="requirements"
									value={formData.requirements}
									onChange={handleInputChange}
									placeholder="List admission requirements..."
								/>
							</Form.Group>

							<div className="mb-3">
								<Form.Check
									type="checkbox"
									id="featured"
									name="featured"
									label="Featured Program"
									checked={formData.featured}
									onChange={handleInputChange}
								/>
								<Form.Check
									type="checkbox"
									id="isOnline"
									name="isOnline"
									label="Online Program"
									checked={formData.isOnline}
									onChange={handleInputChange}
								/>
							</div>
						</Col>
					</Row>

					{/* Additional Details */}
					<Row className="mt-4">
						<Col>
							<h6 className="mb-3 text-primary">Additional Information</h6>
						</Col>
					</Row>

					<Row>
						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Program Objectives</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="objectives"
									value={formData.objectives}
									onChange={handleInputChange}
									placeholder="Describe the program objectives..."
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Prerequisites</Form.Label>
								<Form.Control
									as="textarea"
									rows={2}
									name="prerequisites"
									value={formData.prerequisites}
									onChange={handleInputChange}
									placeholder="List any prerequisites..."
								/>
							</Form.Group>
						</Col>

						<Col md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Learning Outcomes</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="outcomes"
									value={formData.outcomes}
									onChange={handleInputChange}
									placeholder="Describe expected learning outcomes..."
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Career Prospects</Form.Label>
								<Form.Control
									as="textarea"
									rows={2}
									name="careerProspects"
									value={formData.careerProspects}
									onChange={handleInputChange}
									placeholder="Describe career opportunities..."
								/>
							</Form.Group>
						</Col>
					</Row>

					<Form.Group className="mb-3">
						<Form.Label>Accreditation</Form.Label>
						<Form.Control
							type="text"
							name="accreditation"
							value={formData.accreditation}
							onChange={handleTextInputChange}
							placeholder="e.g., ABET Accredited"
						/>
						<Form.Text className="text-muted">
							Letters and punctuation only (no numbers)
						</Form.Text>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleClose}
						disabled={isSubmitting}
					>
						<FaTimes className="me-2" />
						Cancel
					</Button>
					<Button variant="primary" type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
									className="me-2"
								/>
								Saving...
							</>
						) : (
							<>
								<FaSave className="me-2" />
								Save Program
							</>
						)}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default ProgramFormModal;
