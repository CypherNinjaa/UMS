import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Alert,
} from "react-bootstrap";
import {
	FaEnvelope,
	FaLock,
	FaEye,
	FaEyeSlash,
	FaUniversity,
} from "react-icons/fa";
import "./Login.css";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
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

	const validateForm = () => {
		const newErrors = {};

		// Email validation
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log("Login data:", formData);
			// Handle successful login here
			alert("Login successful!");
		} catch (error) {
			console.error("Login error:", error);
			setErrors({ submit: "Login failed. Please try again." });
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="login-wrapper">
			<Container fluid className="h-100">
				<Row className="h-100 no-gutters">
					{/* Left side - Image/Branding */}
					<Col lg={6} className="d-none d-lg-block login-image-section">
						{/* <div className="login-brand-content">
							<div className="brand-logo">
								<FaUniversity className="brand-icon" />
								<h2 className="brand-title">EduVerse University</h2>
							</div>
							<h3 className="welcome-title">Welcome Back!</h3>
						</div> */}
					</Col>

					{/* Right side - Login Form */}
					<Col lg={6} xs={12} className="login-form-section">
						<div className="login-form-container">
							<div className="login-header text-center mb-4">
								<div className="d-lg-none brand-logo-mobile mb-3">
									<FaUniversity className="brand-icon-mobile" />
									<h3 className="brand-title-mobile">UniTech</h3>
								</div>
								<h4 className="login-title">Sign In to Your Account</h4>
								<p className="login-subtitle text-muted">
									Enter your credentials to access the system
								</p>
							</div>

							<Card className="login-card shadow-lg border-0">
								<Card.Body className="p-4">
									{errors.submit && (
										<Alert variant="danger" className="mb-3">
											{errors.submit}
										</Alert>
									)}

									<Form onSubmit={handleSubmit}>
										{/* Email Field */}
										<Form.Group className="mb-3">
											<Form.Label className="form-label">
												<FaEnvelope className="me-2" />
												Email Address
											</Form.Label>
											<div className="input-group">
												<Form.Control
													type="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													placeholder="Enter your email"
													className={`form-control-custom ${
														errors.email ? "is-invalid" : ""
													}`}
													required
												/>
											</div>
											{errors.email && (
												<div className="invalid-feedback d-block">
													{errors.email}
												</div>
											)}
										</Form.Group>

										{/* Password Field */}
										<Form.Group className="mb-3">
											<Form.Label className="form-label">
												<FaLock className="me-2" />
												Password
											</Form.Label>
											<div className="input-group">
												<Form.Control
													type={showPassword ? "text" : "password"}
													name="password"
													value={formData.password}
													onChange={handleInputChange}
													placeholder="Enter your password"
													className={`form-control-custom ${
														errors.password ? "is-invalid" : ""
													}`}
													required
												/>
												<Button
													variant="outline-secondary"
													type="button"
													className="password-toggle-btn"
													onClick={togglePasswordVisibility}
												>
													{showPassword ? <FaEyeSlash /> : <FaEye />}
												</Button>
											</div>
											{errors.password && (
												<div className="invalid-feedback d-block">
													{errors.password}
												</div>
											)}
										</Form.Group>

										{/* Remember Me & Forgot Password */}
										<div className="d-flex justify-content-between align-items-center mb-4">
											<Form.Check
												type="checkbox"
												id="rememberMe"
												label="Remember me"
												className="custom-checkbox"
											/>
											<a href="#" className="forgot-password-link">
												Forgot Password?
											</a>
										</div>

										{/* Submit Button */}
										<Button
											type="submit"
											className="login-btn w-100 mb-3"
											disabled={isLoading}
										>
											{isLoading ? (
												<>
													<span
														className="spinner-border spinner-border-sm me-2"
														role="status"
														aria-hidden="true"
													></span>
													Signing In...
												</>
											) : (
												"Sign In"
											)}
										</Button>

										{/* Additional Links */}
										<div className="text-center">
											<p className="mb-0 text-muted">
												Need help?{" "}
												<a href="#" className="support-link">
													Contact Support
												</a>
											</p>
										</div>
									</Form>
								</Card.Body>
							</Card>

							{/* Footer */}
							<div className="login-footer text-center mt-4">
								<p className="text-muted small">
									© 2025 UniTech University Management System. All rights
									reserved.
								</p>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
