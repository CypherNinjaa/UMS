import React, { useState } from "react";
import {
	Row,
	Col,
	Card,
	Button,
	Table,
	Badge,
	Form,
	InputGroup,
	Dropdown,
	Modal,
	Tab,
	Tabs,
	ProgressBar,
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaFilter,
	FaDownload,
	FaGraduationCap,
	FaClock,
	FaUsers,
	FaChartLine,
	FaStar,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";

const ProgramManagement = () => {
	// Sample program data
	const [programs, setPrograms] = useState([
		{
			id: 1,
			name: "Bachelor of Computer Science",
			code: "BCS",
			type: "Undergraduate",
			duration: "4 years",
			credits: 120,
			department: "Computer Science",
			status: "Active",
			enrollment: 145,
			capacity: 200,
			rating: 4.8,
			faculty: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
			description:
				"Comprehensive computer science program covering programming, algorithms, and software engineering.",
			requirements: "High school diploma, Mathematics proficiency",
			startDate: "2024-09-01",
			featured: true,
		},
		{
			id: 2,
			name: "Master of Business Administration",
			code: "MBA",
			type: "Graduate",
			duration: "2 years",
			credits: 60,
			department: "Business Administration",
			status: "Active",
			enrollment: 89,
			capacity: 120,
			rating: 4.6,
			faculty: ["Dr. Michael Chen", "Dr. Lisa Zhang"],
			description:
				"Advanced business management program for aspiring leaders and entrepreneurs.",
			requirements: "Bachelor's degree, 2 years work experience",
			startDate: "2024-09-01",
			featured: true,
		},
		{
			id: 3,
			name: "Bachelor of Biology",
			code: "BB",
			type: "Undergraduate",
			duration: "4 years",
			credits: 125,
			department: "Biology",
			status: "Active",
			enrollment: 67,
			capacity: 100,
			rating: 4.5,
			faculty: ["Dr. Emily Rodriguez"],
			description:
				"Comprehensive biology program with focus on genetics and biotechnology.",
			requirements: "High school diploma, Science background",
			startDate: "2024-09-01",
			featured: false,
		},
		{
			id: 4,
			name: "Bachelor of Engineering",
			code: "BE",
			type: "Undergraduate",
			duration: "4 years",
			credits: 130,
			department: "Engineering",
			status: "Active",
			enrollment: 112,
			capacity: 150,
			rating: 4.7,
			faculty: ["Dr. James Wilson", "Dr. Robert Taylor"],
			description:
				"Engineering program specializing in robotics and automation systems.",
			requirements: "High school diploma, Mathematics and Physics proficiency",
			startDate: "2024-09-01",
			featured: true,
		},
		{
			id: 5,
			name: "Master of International Relations",
			code: "MIR",
			type: "Graduate",
			duration: "2 years",
			credits: 48,
			department: "Political Science",
			status: "Active",
			enrollment: 34,
			capacity: 60,
			rating: 4.4,
			faculty: ["Dr. Lisa Zhang"],
			description:
				"Advanced program in international diplomacy and global politics.",
			requirements: "Bachelor's degree in related field",
			startDate: "2024-09-01",
			featured: false,
		},
		{
			id: 6,
			name: "Certificate in Data Analytics",
			code: "CDA",
			type: "Certificate",
			duration: "6 months",
			credits: 24,
			department: "Computer Science",
			status: "Planning",
			enrollment: 0,
			capacity: 40,
			rating: 0,
			faculty: ["Dr. Sarah Johnson", "Dr. Robert Taylor"],
			description:
				"Intensive program covering data analysis, visualization, and machine learning basics.",
			requirements: "Basic programming knowledge",
			startDate: "2025-01-15",
			featured: false,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("All");
	const [selectedDepartment, setSelectedDepartment] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedProgram, setSelectedProgram] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");

	// Get unique values for filters
	const programTypes = [
		"All",
		...new Set(programs.map((program) => program.type)),
	];
	const departments = [
		"All",
		...new Set(programs.map((program) => program.department)),
	];
	const statuses = [
		"All",
		...new Set(programs.map((program) => program.status)),
	];

	// Filter programs
	const filteredPrograms = programs.filter((program) => {
		const matchesSearch =
			program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
			program.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = selectedType === "All" || program.type === selectedType;
		const matchesDepartment =
			selectedDepartment === "All" || program.department === selectedDepartment;
		const matchesStatus =
			selectedStatus === "All" || program.status === selectedStatus;

		return matchesSearch && matchesType && matchesDepartment && matchesStatus;
	});

	const handleDelete = (program) => {
		setSelectedProgram(program);
		setShowDeleteModal(true);
	};

	const handleViewDetails = (program) => {
		setSelectedProgram(program);
		setShowDetailsModal(true);
	};

	const confirmDelete = () => {
		setPrograms(
			programs.filter((program) => program.id !== selectedProgram.id)
		);
		setShowDeleteModal(false);
		setSelectedProgram(null);
	};

	const getStatusBadge = (status) => {
		const variants = {
			Active: "success",
			Planning: "warning",
			Suspended: "danger",
			Completed: "secondary",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	const getTypeBadge = (type) => {
		const variants = {
			Undergraduate: "primary",
			Graduate: "info",
			Certificate: "warning",
			Diploma: "secondary",
		};
		return <Badge bg={variants[type] || "secondary"}>{type}</Badge>;
	};

	const getEnrollmentPercentage = (enrollment, capacity) => {
		return capacity > 0 ? Math.round((enrollment / capacity) * 100) : 0;
	};

	const getEnrollmentVariant = (percentage) => {
		if (percentage >= 90) return "danger";
		if (percentage >= 70) return "warning";
		return "success";
	};

	// Calculate statistics
	const totalPrograms = programs.length;
	const activePrograms = programs.filter((p) => p.status === "Active").length;
	const totalEnrollment = programs.reduce((sum, p) => sum + p.enrollment, 0);
	const averageRating =
		programs.reduce((sum, p) => sum + p.rating, 0) / programs.length;

	return (
		<AdminLayout>
			<div className="program-management">
				{/* Page Header */}
				<div className="page-header mb-4">
					<Row className="align-items-center">
						<Col>
							<h2 className="page-title">Program Management</h2>
							<p className="page-subtitle text-muted">
								Manage academic programs, curricula, and enrollment
							</p>
						</Col>
						<Col xs="auto">
							<Button variant="primary" className="me-2">
								<FaPlus className="me-2" />
								Add Program
							</Button>
							<Button variant="outline-secondary">
								<FaDownload className="me-2" />
								Export
							</Button>
						</Col>
					</Row>
				</div>

				{/* Statistics Cards */}
				<Row className="mb-4">
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaGraduationCap
									className="stats-icon text-primary mb-2"
									size={24}
								/>
								<h3 className="mb-0">{totalPrograms}</h3>
								<p className="text-muted mb-0">Total Programs</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaChartLine
									className="stats-icon text-success mb-2"
									size={24}
								/>
								<h3 className="mb-0">{activePrograms}</h3>
								<p className="text-muted mb-0">Active Programs</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUsers className="stats-icon text-info mb-2" size={24} />
								<h3 className="mb-0">{totalEnrollment}</h3>
								<p className="text-muted mb-0">Total Enrollment</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaStar className="stats-icon text-warning mb-2" size={24} />
								<h3 className="mb-0">{averageRating.toFixed(1)}</h3>
								<p className="text-muted mb-0">Average Rating</p>
							</Card.Body>
						</Card>
					</Col>
				</Row>

				{/* Filters and Search */}
				<Card className="mb-4">
					<Card.Body>
						<Row className="align-items-center g-3">
							<Col md={4}>
								<InputGroup>
									<InputGroup.Text>
										<FaSearch />
									</InputGroup.Text>
									<Form.Control
										type="text"
										placeholder="Search programs by name, code, or department..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
								>
									{programTypes.map((type) => (
										<option key={type} value={type}>
											{type === "All" ? "All Types" : type}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedDepartment}
									onChange={(e) => setSelectedDepartment(e.target.value)}
								>
									{departments.map((department) => (
										<option key={department} value={department}>
											{department === "All" ? "All Departments" : department}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedStatus}
									onChange={(e) => setSelectedStatus(e.target.value)}
								>
									{statuses.map((status) => (
										<option key={status} value={status}>
											{status === "All" ? "All Status" : status}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2} className="text-end">
								<Button variant="outline-primary" size="sm" className="me-2">
									<FaFilter className="me-1" />
									More Filters
								</Button>
								<div className="text-muted small">
									{filteredPrograms.length} of {programs.length} programs
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				{/* Programs Table */}
				<Card>
					<Card.Body className="p-0">
						<Table responsive hover className="mb-0">
							<thead className="bg-light">
								<tr>
									<th>Program</th>
									<th>Type & Duration</th>
									<th>Department</th>
									<th>Enrollment</th>
									<th>Rating</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredPrograms.map((program) => {
									const enrollmentPercent = getEnrollmentPercentage(
										program.enrollment,
										program.capacity
									);
									return (
										<tr key={program.id}>
											<td>
												<div>
													<div className="fw-semibold d-flex align-items-center">
														{program.name}
														{program.featured && (
															<Badge bg="warning" size="sm" className="ms-2">
																Featured
															</Badge>
														)}
													</div>
													<div className="text-muted small">
														{program.code} • {program.credits} Credits
													</div>
												</div>
											</td>
											<td>
												<div>
													{getTypeBadge(program.type)}
													<div className="text-muted small mt-1">
														<FaClock className="me-1" />
														{program.duration}
													</div>
												</div>
											</td>
											<td>
												<Badge bg="secondary">{program.department}</Badge>
											</td>
											<td>
												<div>
													<div className="small">
														{program.enrollment} / {program.capacity} students
													</div>
													<ProgressBar
														variant={getEnrollmentVariant(enrollmentPercent)}
														now={enrollmentPercent}
														size="sm"
														className="mt-1"
													/>
													<div className="text-muted small">
														{enrollmentPercent}% full
													</div>
												</div>
											</td>
											<td>
												<div className="d-flex align-items-center">
													<FaStar className="text-warning me-1" />
													<span>
														{program.rating > 0
															? program.rating.toFixed(1)
															: "N/A"}
													</span>
												</div>
											</td>
											<td>{getStatusBadge(program.status)}</td>
											<td>
												<Dropdown>
													<Dropdown.Toggle
														variant="outline-secondary"
														size="sm"
														id={`dropdown-${program.id}`}
													>
														Actions
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item
															onClick={() => handleViewDetails(program)}
														>
															<FaEye className="me-2" />
															View Details
														</Dropdown.Item>
														<Dropdown.Item>
															<FaEdit className="me-2" />
															Edit Program
														</Dropdown.Item>
														<Dropdown.Item>
															<FaUsers className="me-2" />
															Manage Enrollment
														</Dropdown.Item>
														<Dropdown.Divider />
														<Dropdown.Item
															className="text-danger"
															onClick={() => handleDelete(program)}
														>
															<FaTrash className="me-2" />
															Delete
														</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>

						{filteredPrograms.length === 0 && (
							<div className="text-center py-5">
								<h5>No programs found</h5>
								<p className="text-muted">
									Try adjusting your search criteria or add a new program.
								</p>
								<Button variant="primary">
									<FaPlus className="me-2" />
									Add First Program
								</Button>
							</div>
						)}
					</Card.Body>
				</Card>

				{/* Program Details Modal */}
				<Modal
					size="lg"
					show={showDetailsModal}
					onHide={() => setShowDetailsModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Program Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedProgram && (
							<Tabs
								activeKey={activeTab}
								onSelect={(k) => setActiveTab(k)}
								className="mb-3"
							>
								<Tab eventKey="overview" title="Overview">
									<Row>
										<Col md={6}>
											<h5>{selectedProgram.name}</h5>
											<p className="text-muted">
												{selectedProgram.description}
											</p>
											<hr />
											<Row>
												<Col sm={6}>
													<strong>Program Code:</strong>
													<div>{selectedProgram.code}</div>
												</Col>
												<Col sm={6}>
													<strong>Type:</strong>
													<div>{getTypeBadge(selectedProgram.type)}</div>
												</Col>
											</Row>
											<Row className="mt-3">
												<Col sm={6}>
													<strong>Duration:</strong>
													<div>{selectedProgram.duration}</div>
												</Col>
												<Col sm={6}>
													<strong>Credits:</strong>
													<div>{selectedProgram.credits}</div>
												</Col>
											</Row>
										</Col>
										<Col md={6}>
											<Card className="bg-light">
												<Card.Body>
													<h6>Enrollment Statistics</h6>
													<div className="mb-2">
														<div className="d-flex justify-content-between">
															<span>Current Enrollment:</span>
															<strong>{selectedProgram.enrollment}</strong>
														</div>
														<div className="d-flex justify-content-between">
															<span>Capacity:</span>
															<strong>{selectedProgram.capacity}</strong>
														</div>
														<div className="d-flex justify-content-between">
															<span>Utilization:</span>
															<strong>
																{getEnrollmentPercentage(
																	selectedProgram.enrollment,
																	selectedProgram.capacity
																)}
																%
															</strong>
														</div>
													</div>
													<ProgressBar
														variant={getEnrollmentVariant(
															getEnrollmentPercentage(
																selectedProgram.enrollment,
																selectedProgram.capacity
															)
														)}
														now={getEnrollmentPercentage(
															selectedProgram.enrollment,
															selectedProgram.capacity
														)}
													/>
												</Card.Body>
											</Card>
										</Col>
									</Row>
								</Tab>
								<Tab eventKey="faculty" title="Faculty">
									<h6>Assigned Faculty</h6>
									{selectedProgram.faculty.map((facultyName, index) => (
										<div key={index} className="d-flex align-items-center mb-2">
											<Badge bg="primary" className="me-2">
												{index + 1}
											</Badge>
											{facultyName}
										</div>
									))}
								</Tab>
								<Tab eventKey="requirements" title="Requirements">
									<h6>Admission Requirements</h6>
									<p>{selectedProgram.requirements}</p>
									<h6>Program Start Date</h6>
									<p>
										{new Date(selectedProgram.startDate).toLocaleDateString()}
									</p>
								</Tab>
							</Tabs>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowDetailsModal(false)}
						>
							Close
						</Button>
						<Button variant="primary">
							<FaEdit className="me-2" />
							Edit Program
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Delete Confirmation Modal */}
				<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedProgram && (
							<>
								<p>
									Are you sure you want to delete the program{" "}
									<strong>{selectedProgram.name}</strong>?
								</p>
								<div className="alert alert-warning">
									<strong>Warning:</strong> This will affect{" "}
									{selectedProgram.enrollment} enrolled students.
								</div>
								<p className="text-muted small">
									This action cannot be undone. All associated data, including
									student enrollments and course records, will be permanently
									removed.
								</p>
							</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowDeleteModal(false)}
						>
							Cancel
						</Button>
						<Button variant="danger" onClick={confirmDelete}>
							Delete Program
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</AdminLayout>
	);
};

export default ProgramManagement;
