import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Nav,
	Alert,
	Spinner,
} from "react-bootstrap";
import "./Contact.css";
import customerSupportSVG from "../assets/employeesHelpingCustomers.svg";

const Contact = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		organisationName: "",
		message: "",
	});
	const [activeTab, setActiveTab] = useState("course");
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
	const [showSuccess, setShowSuccess] = useState(false);

	// Validation functions
	const validateFullName = (name) => {
		if (!name.trim()) return "Full name is required";
		if (name.trim().length < 2)
			return "Full name must be at least 2 characters long";
		if (name.trim().length > 100)
			return "Full name cannot exceed 100 characters";
		if (!/^[a-zA-Z\s]+$/.test(name.trim()))
			return "Full name can only contain letters and spaces";
		return "";
	};

	const validateEmail = (email) => {
		if (!email.trim()) return "Email is required";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email.trim()))
			return "Please provide a valid email address";
		return "";
	};

	const validatePhone = (phone) => {
		if (!phone.trim()) return "Phone number is required";
		const phoneRegex = /^[6-9]\d{9}$/;
		if (!phoneRegex.test(phone.trim()))
			return "Please provide a valid 10-digit Indian phone number (starting with 6-9)";
		return "";
	};

	const validateOrganisation = (orgName) => {
		if (activeTab === "corporate") {
			if (!orgName.trim())
				return "Organisation name is required for corporate enquiries";
			if (orgName.trim().length > 200)
				return "Organisation name cannot exceed 200 characters";
		}
		return "";
	};

	const validateMessage = (message) => {
		if (!message.trim()) return "Message is required";
		if (message.trim().length < 10)
			return "Message must be at least 10 characters long";
		if (message.trim().length > 1000)
			return "Message cannot exceed 1000 characters";
		return "";
	};

	// Real-time validation
	const validateField = (name, value) => {
		let error = "";
		switch (name) {
			case "fullName":
				error = validateFullName(value);
				break;
			case "email":
				error = validateEmail(value);
				break;
			case "phone":
				error = validatePhone(value);
				break;
			case "organisationName":
				// Only validate organisation name if we're on corporate tab
				if (activeTab === "corporate") {
					error = validateOrganisation(value);
				}
				break;
			case "message":
				error = validateMessage(value);
				break;
			default:
				break;
		}
		return error;
	};

	// Handle form input changes with real-time validation
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		// Update form data
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear previous submit message
		if (submitMessage.text) {
			setSubmitMessage({ type: "", text: "" });
		}

		// Real-time validation
		const error = validateField(name, value);
		setErrors((prev) => {
			const newErrors = { ...prev };
			if (error) {
				newErrors[name] = error;
			} else {
				delete newErrors[name];
			}
			return newErrors;
		});
	};

	// Validate entire form
	const validateForm = () => {
		const newErrors = {};

		newErrors.fullName = validateFullName(formData.fullName);
		newErrors.email = validateEmail(formData.email);
		newErrors.phone = validatePhone(formData.phone);

		// Only validate organisation name for corporate enquiries
		if (activeTab === "corporate") {
			newErrors.organisationName = validateOrganisation(
				formData.organisationName
			);
		}

		newErrors.message = validateMessage(formData.message);

		// Remove empty errors
		Object.keys(newErrors).forEach((key) => {
			if (!newErrors[key]) delete newErrors[key];
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle tab change and validate organisation field
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		// Clear organisation validation error when switching away from corporate
		if (tab === "course" && errors.organisationName) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors.organisationName;
				return newErrors;
			});
		}
		// Validate organisation field when switching to corporate
		if (tab === "corporate") {
			const orgError = validateOrganisation(formData.organisationName);
			if (orgError) {
				setErrors((prev) => ({ ...prev, organisationName: orgError }));
			}
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Clear previous messages
		setSubmitMessage({ type: "", text: "" });

		// Validate form
		if (!validateForm()) {
			setSubmitMessage({
				type: "danger",
				text: "Please fix the validation errors before submitting.",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const submitData = {
				fullName: formData.fullName.trim(),
				email: formData.email.trim().toLowerCase(),
				phone: formData.phone.trim(),
				organisationName:
					activeTab === "corporate" ? formData.organisationName.trim() : null,
				message: formData.message.trim(),
				enquiryType: activeTab,
			};

			const response = await fetch("http://localhost:3000/api/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitData),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				setShowSuccess(true);
				setSubmitMessage({
					type: "success",
					text: "Thank you! Your message has been submitted successfully. We'll get back to you within 24 hours.",
				});

				// Reset form
				setFormData({
					fullName: "",
					email: "",
					phone: "",
					organisationName: "",
					message: "",
				});
				setErrors({});

				// Hide success message after 5 seconds
				setTimeout(() => {
					setShowSuccess(false);
					setSubmitMessage({ type: "", text: "" });
				}, 5000);
			} else {
				// Handle validation errors from server
				if (data.errors && Array.isArray(data.errors)) {
					setSubmitMessage({
						type: "danger",
						text: data.errors.join(", "),
					});
				} else {
					setSubmitMessage({
						type: "danger",
						text: data.message || "Failed to submit form. Please try again.",
					});
				}
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitMessage({
				type: "danger",
				text: "Network error. Please check your connection and try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="contact-page">
			<Container fluid>
				<Row className="min-vh-100">
					{/* Left Section - Contact Info */}
					<Col lg={6} className="contact-left-section">
						<div className="contact-info">
							<h1 className="contact-title mt-4">Contact Us</h1>
							<p className="contact-description">
								For any queries, Please reach out to us. Our Support team will
								get back to you within 24 hours.
							</p>

							<div className="contact-details">
								<div className="contact-item">
									<span className="contact-icon">✉</span>
									<span>hariom.21242@gmail.com</span>
								</div>
								<div className="contact-item">
									<span className="contact-icon">📞</span>
									<span>+91 8294447219</span>
								</div>
							</div>

							<div className="contact-image ">
								<img
									src={customerSupportSVG}
									alt="Customer Support Team"
									className="support-illustration"
								/>
							</div>
						</div>
					</Col>

					{/* Right Section - Contact Form */}
					<Col lg={6} className="contact-right-section">
						<div className="contact-form-container">
							{/* Tab Navigation */}
							<Nav variant="tabs" className="custom-tabs">
								<Nav.Item>
									<Nav.Link
										active={activeTab === "course"}
										onClick={() => handleTabChange("course")}
										className={activeTab === "course" ? "active-tab" : ""}
									>
										Course Enquiry
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										active={activeTab === "corporate"}
										onClick={() => handleTabChange("corporate")}
										className={activeTab === "corporate" ? "active-tab" : ""}
									>
										Corporate Enquiry
									</Nav.Link>
								</Nav.Item>
							</Nav>

							{/* Success/Error Messages */}
							{submitMessage.text && (
								<Alert
									variant={submitMessage.type}
									className="mt-3"
									dismissible={!showSuccess}
									onClose={() => setSubmitMessage({ type: "", text: "" })}
								>
									{submitMessage.text}
								</Alert>
							)}

							{/* Contact Form */}
							<Form onSubmit={handleSubmit} className="contact-form" noValidate>
								<Form.Group className="mb-3">
									<Form.Label>Full Name *</Form.Label>
									<Form.Control
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleInputChange}
										placeholder="Enter your full name"
										required
										isInvalid={!!errors.fullName}
										disabled={isSubmitting}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.fullName}
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Email Address *</Form.Label>
									<Form.Control
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Enter your email address"
										required
										isInvalid={!!errors.email}
										disabled={isSubmitting}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>

								{/* Organisation Name field - only for Corporate Enquiry */}
								{activeTab === "corporate" && (
									<Form.Group className="mb-3">
										<Form.Label>Organisation Name *</Form.Label>
										<Form.Control
											type="text"
											name="organisationName"
											value={formData.organisationName}
											onChange={handleInputChange}
											placeholder="Enter your organisation name"
											required
											isInvalid={!!errors.organisationName}
											disabled={isSubmitting}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.organisationName}
										</Form.Control.Feedback>
									</Form.Group>
								)}

								<Form.Group className="mb-3">
									<Form.Label>Phone Number *</Form.Label>
									<div className="phone-input-group">
										<span className="country-code">IN ▼ +91</span>
										<Form.Control
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											placeholder="Enter your phone number"
											required
											isInvalid={!!errors.phone}
											disabled={isSubmitting}
											maxLength="10"
										/>
									</div>
									{errors.phone && (
										<div className="invalid-feedback d-block">
											{errors.phone}
										</div>
									)}
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Label>Message *</Form.Label>
									<Form.Control
										as="textarea"
										rows={4}
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										placeholder="Enter your message (minimum 10 characters)"
										required
										isInvalid={!!errors.message}
										disabled={isSubmitting}
										maxLength="1000"
									/>
									<Form.Control.Feedback type="invalid">
										{errors.message}
									</Form.Control.Feedback>
									<Form.Text className="text-muted">
										{formData.message.length}/1000 characters
									</Form.Text>
								</Form.Group>

								<Button
									type="submit"
									className="submit-btn"
									disabled={isSubmitting}
								>
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
											Submitting...
										</>
									) : (
										"Submit"
									)}
								</Button>
							</Form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Contact;
