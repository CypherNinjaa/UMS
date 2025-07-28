import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import "./Contact.css";
import customerSupportSVG from "../assets/employeesHelpingCustomers.svg";

const Contact = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		message: "",
	});
	const [activeTab, setActiveTab] = useState("course");

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Add form submission logic here
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
									<span>support@EduVerse.com</span>
								</div>
								<div className="contact-item">
									<span className="contact-icon">📞</span>
									<span>+91 1234567890</span>
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
										onClick={() => setActiveTab("course")}
										className={activeTab === "course" ? "active-tab" : ""}
									>
										Course Enquiry
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										active={activeTab === "corporate"}
										onClick={() => setActiveTab("corporate")}
										className={activeTab === "corporate" ? "active-tab" : ""}
									>
										Corporate Enquiry
									</Nav.Link>
								</Nav.Item>
							</Nav>

							{/* Contact Form */}
							<Form onSubmit={handleSubmit} className="contact-form">
								<Form.Group className="mb-3">
									<Form.Label>Full Name *</Form.Label>
									<Form.Control
										type="text"
										name="fullName"
										value={formData.fullName}
										onChange={handleInputChange}
										placeholder=""
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Email Address *</Form.Label>
									<Form.Control
										type="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder=""
										required
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Phone Number *</Form.Label>
									<div className="phone-input-group">
										<span className="country-code">IN ▼ +91</span>
										<Form.Control
											type="tel"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											placeholder="Enter your phone number *"
											required
										/>
									</div>
								</Form.Group>

								<Form.Group className="mb-4">
									<Form.Control
										as="textarea"
										rows={4}
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										placeholder="Your message *"
										required
									/>
								</Form.Group>

								<Button type="submit" className="submit-btn">
									Submit
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
