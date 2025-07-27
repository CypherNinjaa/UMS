import React, { useState } from "react";
import {
	Row,
	Col,
	Card,
	Button,
	Form,
	Tab,
	Tabs,
	Alert,
	Badge,
	ListGroup,
	InputGroup,
} from "react-bootstrap";
import {
	FaSave,
	FaCog,
	FaUniversity,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaGlobe,
	FaUser,
	FaLock,
	FaPalette,
	FaBell,
	FaDatabase,
	FaDownload,
	FaUpload,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";

const AdminSettings = () => {
	const [activeTab, setActiveTab] = useState("general");
	const [saveStatus, setSaveStatus] = useState("");

	// General Settings State
	const [generalSettings, setGeneralSettings] = useState({
		universityName: "EduVerse University",
		tagline: "Excellence in Education",
		address: "123 University Avenue, Education City, EC 12345",
		phone: "+1-555-EDUVERSE",
		email: "info@eduverse.edu",
		website: "https://www.eduverse.edu",
		description:
			"A leading institution committed to academic excellence and innovation.",
		establishedYear: "1985",
		accreditation: "Accredited by National Education Board",
	});





	// Security Settings State
	const [securitySettings, setSecuritySettings] = useState({
		sessionTimeout: "30",
		passwordExpiry: "90",
		maxLoginAttempts: "5",
		twoFactorAuth: false,
		ipWhitelist: "",
		maintenanceMode: false,
	});

	const handleGeneralChange = (e) => {
		const { name, value } = e.target;
		setGeneralSettings((prev) => ({ ...prev, [name]: value }));
	};



	const handleSecurityChange = (e) => {
		const { name, value, type, checked } = e.target;
		setSecuritySettings((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSave = (settingsType) => {
		setSaveStatus(`${settingsType} settings saved successfully!`);
		setTimeout(() => setSaveStatus(""), 3000);
	};

	const handleExportData = () => {
		// Simulate data export
		console.log("Exporting university data...");
		setSaveStatus(
			"Data export initiated. You will receive an email when ready."
		);
		setTimeout(() => setSaveStatus(""), 5000);
	};

	const handleImportData = () => {
		// Simulate data import
		console.log("Import data functionality...");
		setSaveStatus("Please select a file to import university data.");
		setTimeout(() => setSaveStatus(""), 3000);
	};

	return (
		<AdminLayout>
			<div className="admin-settings">
				{/* Page Header */}
				<div className="page-header mb-4">
					<Row className="align-items-center">
						<Col>
							<h2 className="page-title">
								<FaCog className="me-3" />
								System Settings
							</h2>
							<p className="page-subtitle text-muted">
								Configure university settings, preferences, and system options
							</p>
						</Col>
					</Row>
				</div>

				{/* Success/Status Alert */}
				{saveStatus && (
					<Alert variant="success" className="mb-4">
						{saveStatus}
					</Alert>
				)}

				{/* Settings Tabs */}
				<Card>
					<Card.Body>
						<Tabs
							activeKey={activeTab}
							onSelect={(k) => setActiveTab(k)}
							className="mb-4"
						>
							{/* General Settings Tab */}
							<Tab
								eventKey="general"
								title={
									<>
										<FaUniversity className="me-2" />
										General
									</>
								}
							>
								<Form>
									<Row>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>University Name</Form.Label>
												<Form.Control
													type="text"
													name="universityName"
													value={generalSettings.universityName}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>Tagline</Form.Label>
												<Form.Control
													type="text"
													name="tagline"
													value={generalSettings.tagline}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>
													<FaPhone className="me-2" />
													Phone Number
												</Form.Label>
												<Form.Control
													type="tel"
													name="phone"
													value={generalSettings.phone}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>
													<FaEnvelope className="me-2" />
													Email Address
												</Form.Label>
												<Form.Control
													type="email"
													name="email"
													value={generalSettings.email}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>
													<FaGlobe className="me-2" />
													Website URL
												</Form.Label>
												<Form.Control
													type="url"
													name="website"
													value={generalSettings.website}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
										<Col md={6}>
											<Form.Group className="mb-3">
												<Form.Label>Established Year</Form.Label>
												<Form.Control
													type="number"
													name="establishedYear"
													value={generalSettings.establishedYear}
													onChange={handleGeneralChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Form.Group className="mb-3">
										<Form.Label>
											<FaMapMarkerAlt className="me-2" />
											Address
										</Form.Label>
										<Form.Control
											as="textarea"
											rows={2}
											name="address"
											value={generalSettings.address}
											onChange={handleGeneralChange}
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Description</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											name="description"
											value={generalSettings.description}
											onChange={handleGeneralChange}
										/>
									</Form.Group>

									<Form.Group className="mb-3">
										<Form.Label>Accreditation</Form.Label>
										<Form.Control
											type="text"
											name="accreditation"
											value={generalSettings.accreditation}
											onChange={handleGeneralChange}
										/>
									</Form.Group>

									<Button
										variant="primary"
										onClick={() => handleSave("General")}
									>
										<FaSave className="me-2" />
										Save General Settings
									</Button>
								</Form>
							</Tab>



							
							{/* Security Settings Tab */}
							<Tab
								eventKey="security"
								title={
									<>
										
										Security
									</>
								}
							>
								<Row>
									<Col md={6}>
										<h5 className="mb-3">Access Control</h5>
										<Form.Group className="mb-3">
											<Form.Label>Session Timeout (minutes)</Form.Label>
											<Form.Select
												name="sessionTimeout"
												value={securitySettings.sessionTimeout}
												onChange={handleSecurityChange}
											>
												<option value="15">15 minutes</option>
												<option value="30">30 minutes</option>
												<option value="60">1 hour</option>
												<option value="120">2 hours</option>
											</Form.Select>
										</Form.Group>
										<Form.Group className="mb-3">
											<Form.Label>Password Expiry (days)</Form.Label>
											<Form.Select
												name="passwordExpiry"
												value={securitySettings.passwordExpiry}
												onChange={handleSecurityChange}
											>
												<option value="30">30 days</option>
												<option value="60">60 days</option>
												<option value="90">90 days</option>
												<option value="180">180 days</option>
											</Form.Select>
										</Form.Group>
									</Col>
									<Col md={6}>
										<h5 className="mb-3">Authentication</h5>
										<Form.Check
											type="switch"
											id="twoFactorAuth"
											name="twoFactorAuth"
											label="Two-Factor Authentication"
											checked={securitySettings.twoFactorAuth}
											onChange={handleSecurityChange}
											className="mb-2"
										/>
										<Form.Group className="mb-3">
											<Form.Label>Max Login Attempts</Form.Label>
											<Form.Select
												name="maxLoginAttempts"
												value={securitySettings.maxLoginAttempts}
												onChange={handleSecurityChange}
											>
												<option value="3">3 attempts</option>
												<option value="5">5 attempts</option>
												<option value="10">10 attempts</option>
											</Form.Select>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col md={12}>
										<Form.Check
											type="switch"
											id="maintenanceMode"
											name="maintenanceMode"
											label="Maintenance Mode"
											checked={securitySettings.maintenanceMode}
											onChange={handleSecurityChange}
											className="mb-3"
										/>
										<Alert
											variant="warning"
											show={securitySettings.maintenanceMode}
										>
											<strong>Warning:</strong> Maintenance mode will make the
											website unavailable to users.
										</Alert>
									</Col>
								</Row>

								<Button
									variant="primary"
									onClick={() => handleSave("Security")}
									className="mt-3"
								>
									<FaSave className="me-2" />
									Save Security Settings
								</Button>
							</Tab>

							{/* Data Management Tab */}
							<Tab
								eventKey="data"
								title={
									<>
										<FaDatabase className="me-2" />
										Data
									</>
								}
							>
								<Row>
									<Col md={6}>
										<Card className="border-success">
											<Card.Header className="bg-success text-white">
												<FaDownload className="me-2" />
												Export Data
											</Card.Header>
											<Card.Body>
												<p>
													Download a complete backup of all university data
													including faculty, students, and programs.
												</p>
												<ListGroup variant="flush" className="mb-3">
													<ListGroup.Item>
														<Badge bg="primary" className="me-2">
															Faculty
														</Badge>
														All faculty members and profiles
													</ListGroup.Item>
													<ListGroup.Item>
														<Badge bg="info" className="me-2">
															Students
														</Badge>
														Student records and academic data
													</ListGroup.Item>
													<ListGroup.Item>
														<Badge bg="warning" className="me-2">
															Programs
														</Badge>
														Academic programs and curricula
													</ListGroup.Item>
												</ListGroup>
												<Button
													variant="success"
													onClick={handleExportData}
													className="w-100"
												>
													<FaDownload className="me-2" />
													Export All Data
												</Button>
											</Card.Body>
										</Card>
									</Col>
									<Col md={6}>
										<Card className="border-warning">
											<Card.Header className="bg-warning text-dark">
												<FaUpload className="me-2" />
												Import Data
											</Card.Header>
											<Card.Body>
												<p>
													Import university data from a previously exported
													backup file.
												</p>
												<Alert variant="warning">
													<strong>Caution:</strong> Importing data will
													overwrite existing records. Make sure to backup
													current data first.
												</Alert>
												<Form.Group className="mb-3">
													<Form.Label>Select Backup File</Form.Label>
													<Form.Control type="file" accept=".json,.csv" />
												</Form.Group>
												<Button
													variant="warning"
													onClick={handleImportData}
													className="w-100"
												>
													<FaUpload className="me-2" />
													Import Data
												</Button>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</Tab>
						</Tabs>
					</Card.Body>
				</Card>
			</div>
		</AdminLayout>
	);
};

export default AdminSettings;
