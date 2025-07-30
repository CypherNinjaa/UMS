import React, { useState, useEffect } from "react";
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
	Spinner,
	Alert,
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
	FaRegStar,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import ProgramFormModal from "../Components/Admin/Forms/ProgramFormModal";
import ProgramViewModal from "../Components/Admin/Forms/ProgramViewModal";
import { usePrograms } from "../hooks/usePrograms";

const ProgramManagement = () => {
	// Use Program Context for dynamic data
	const {
		programs,
		departments,
		statistics,
		loading,
		error,
		filters,
		// sorting, // unused for now
		actions,
	} = usePrograms();

	// Extract action functions
	const {
		fetchPrograms,
		fetchDepartments,
		fetchStatistics,
		createProgram,
		updateProgram,
		deleteProgram,
		bulkDeletePrograms,
		toggleFeatured,
		clearError,
	} = actions;

	// Local state for UI interactions
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedProgram, setSelectedProgram] = useState(null);
	// const [editingProgram, setEditingProgram] = useState(null); // unused - using selectedProgram instead
	const [isEditing, setIsEditing] = useState(false);
	const [selectedProgramIds, setSelectedProgramIds] = useState([]);
	const [localSearchTerm, setLocalSearchTerm] = useState(filters.search);
	const [localType, setLocalType] = useState(filters.type);
	const [localDepartment, setLocalDepartment] = useState(filters.department);
	const [localStatus, setLocalStatus] = useState(filters.status);
	const [activeTab, setActiveTab] = useState("overview");

	// Program types for filtering
	const programTypes = [
		"All",
		"Undergraduate",
		"Graduate",
		"Certificate",
		"Diploma",
		"Doctorate",
	];

	// Program statuses for filtering
	const statuses = [
		"All",
		"Active",
		"Planning",
		"Suspended",
		"Completed",
		"Inactive",
	];

	// Filter programs based on local filters (client-side filtering for better performance)
	const filteredPrograms = programs.filter((program) => {
		const programName =
			program.program_name || program.name || program.title || "";
		const programCode = program.program_code || program.code || "";
		const programDepartment = program.department || "";
		const programDescription = program.description || "";

		const matchesSearch =
			localSearchTerm === "" ||
			programName.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
			programCode.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
			programDepartment.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
			programDescription.toLowerCase().includes(localSearchTerm.toLowerCase());
		const matchesType = localType === "All" || program.type === localType;
		const matchesDepartment =
			localDepartment === "All" || program.department === localDepartment;
		const matchesStatus =
			localStatus === "All" || program.status === localStatus;

		return matchesSearch && matchesType && matchesDepartment && matchesStatus;
	});

	// Debug: Check for duplicate keys
	React.useEffect(() => {
		const keys = filteredPrograms.map(
			(program, index) =>
				program.id || program.program_id || program.code || `fallback-${index}`
		);
		const uniqueKeys = new Set(keys);
		if (keys.length !== uniqueKeys.size) {
			console.warn("Duplicate keys detected in filteredPrograms:", keys);
		}
	}, [filteredPrograms]);

	// Load data on component mount
	useEffect(() => {
		fetchPrograms({
			search: "",
			department: "All",
			type: "All",
			status: "All",
			page: 1,
			limit: 100, // Fetch more data at once to reduce API calls
		});
		fetchDepartments();
		fetchStatistics();

		// Debug: Log programs data structure
		if (programs.length > 0) {
			console.log("Programs data structure:", programs[0]);
		}
	}, [fetchPrograms, fetchDepartments, fetchStatistics, programs]);

	// Unused legacy handlers - kept for compatibility
	// const handleDelete = (program) => {
	// 	setSelectedProgram(program);
	// 	setShowDeleteModal(true);
	// };

	// const handleViewDetails = (program) => {
	// 	setSelectedProgram(program);
	// 	setShowDetailsModal(true);
	// };

	// const handleEdit = (program) => {
	// 	setEditingProgram(program);
	// 	setShowFormModal(true);
	// };

	const handleAddNew = () => {
		setSelectedProgram(null);
		setIsEditing(false);
		setShowFormModal(true);
	};

	// const handleEditFromView = (program) => {
	// 	setShowDetailsModal(false);
	// 	setEditingProgram(program);
	// 	setShowFormModal(true);
	// };

	// const handleSaveProgram = async (programData) => {
	// 	try {
	// 		if (editingProgram) {
	// 			// Update existing program
	// 			await updateProgram(editingProgram.id, programData);
	// 		} else {
	// 			// Add new program
	// 			await createProgram(programData);
	// 		}
	// 		setShowFormModal(false);
	// 		setEditingProgram(null);
	// 	} catch (error) {
	// 		console.error("Error saving program:", error);
	// 		// Error will be handled by the context
	// 	}
	// };

	const confirmDelete = async () => {
		try {
			if (selectedProgramIds.length > 0) {
				await bulkDeletePrograms(selectedProgramIds);
				setSelectedProgramIds([]);
			} else if (selectedProgram) {
				await deleteProgram(selectedProgram.program_id);
			}
			setShowDeleteModal(false);
			setSelectedProgram(null);
		} catch (error) {
			console.error("Error deleting program:", error);
		}
	};

	// Additional handler functions for table interactions
	const handleSelectProgram = (programId) => {
		setSelectedProgramIds((prev) =>
			prev.includes(programId)
				? prev.filter((id) => id !== programId)
				: [...prev, programId]
		);
	};

	const handleSelectAll = () => {
		if (selectedProgramIds.length === filteredPrograms.length) {
			setSelectedProgramIds([]);
		} else {
			setSelectedProgramIds(filteredPrograms.map((p) => p.program_id));
		}
	};

	const handleViewProgram = (program) => {
		setSelectedProgram(program);
		setShowViewModal(true);
	};

	const handleEditProgram = (program) => {
		setSelectedProgram(program);
		setIsEditing(true);
		setShowFormModal(true);
	};

	const handleDeleteProgram = async (programId) => {
		if (window.confirm("Are you sure you want to delete this program?")) {
			await deleteProgram(programId);
		}
	};

	const handleBulkDelete = async () => {
		if (selectedProgramIds.length === 0) return;

		if (
			window.confirm(
				`Are you sure you want to delete ${selectedProgramIds.length} selected programs?`
			)
		) {
			await bulkDeletePrograms(selectedProgramIds);
			setSelectedProgramIds([]);
		}
	};

	const refreshPrograms = () => {
		fetchPrograms();
	};

	// const handleToggleFeatured = async (program) => {
	// 	try {
	// 		await toggleFeatured(program.id);
	// 	} catch (error) {
	// 		console.error("Error toggling featured status:", error);
	// 	}
	// };

	// const handleSelectForBulkDelete = (programId) => {
	// 	setSelectedProgramIds((prev) =>
	// 		prev.includes(programId)
	// 			? prev.filter((id) => id !== programId)
	// 			: [...prev, programId]
	// 	);
	// };

	// const handleSelectAllForBulkDelete = () => {
	// 	if (selectedProgramIds.length === filteredPrograms.length) {
	// 		setSelectedProgramIds([]);
	// 	} else {
	// 		setSelectedProgramIds(filteredPrograms.map((p) => p.program_id));
	// 	}
	// };

	// const getStatusBadge = (status) => {
	// 	const variants = {
	// 		Active: "success",
	// 		Planning: "warning",
	// 		Suspended: "danger",
	// 		Completed: "secondary",
	// 		Inactive: "secondary",
	// 	};
	// 	return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	// };

	const getTypeBadge = (type) => {
		const variants = {
			Undergraduate: "primary",
			Graduate: "info",
			Certificate: "warning",
			Diploma: "secondary",
			Doctorate: "dark",
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
							{selectedProgramIds.length > 0 && (
								<Button
									variant="danger"
									className="me-2"
									onClick={handleBulkDelete}
								>
									<FaTrash className="me-2" />
									Delete Selected ({selectedProgramIds.length})
								</Button>
							)}
							<Button variant="primary" className="me-2" onClick={handleAddNew}>
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

				{/* Error Alert */}
				{error && (
					<Alert
						variant="danger"
						className="mb-4"
						dismissible
						onClose={clearError}
					>
						<strong>Error:</strong> {error}
					</Alert>
				)}

				{/* Statistics Cards */}
				<Row className="mb-4">
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaGraduationCap
									className="stats-icon text-primary mb-2"
									size={24}
								/>
								<h3 className="mb-0">{statistics.totalPrograms}</h3>
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
								<h3 className="mb-0">{statistics.activePrograms}</h3>
								<p className="text-muted mb-0">Active Programs</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUsers className="stats-icon text-info mb-2" size={24} />
								<h3 className="mb-0">{statistics.totalEnrollment}</h3>
								<p className="text-muted mb-0">Total Enrollment</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaStar className="stats-icon text-warning mb-2" size={24} />
								<h3 className="mb-0">{statistics.averageRating}</h3>
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
										value={localSearchTerm}
										onChange={(e) => setLocalSearchTerm(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col md={2}>
								<Form.Select
									value={localType}
									onChange={(e) => setLocalType(e.target.value)}
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
									value={localDepartment}
									onChange={(e) => setLocalDepartment(e.target.value)}
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
									value={localStatus}
									onChange={(e) => setLocalStatus(e.target.value)}
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
						{loading ? (
							<div className="text-center p-4">
								<div className="spinner-border text-primary" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
								<p className="mt-2">Loading programs...</p>
							</div>
						) : error ? (
							<div className="text-center p-4">
								<div className="alert alert-danger">
									<p className="mb-0">Error: {error}</p>
									<Button
										variant="outline-primary"
										size="sm"
										className="mt-2"
										onClick={refreshPrograms}
									>
										Try Again
									</Button>
								</div>
							</div>
						) : filteredPrograms.length === 0 ? (
							<div className="text-center py-5">
								<h5>No programs found</h5>
								<p className="text-muted">
									Try adjusting your search criteria or add a new program.
								</p>
								<Button
									variant="primary"
									onClick={() => setShowFormModal(true)}
								>
									<FaPlus className="me-2" />
									Add First Program
								</Button>
							</div>
						) : (
							<Table responsive hover className="mb-0">
								<thead className="bg-light">
									<tr>
										<th>
											<Form.Check
												type="checkbox"
												checked={
													selectedProgramIds.length ===
														filteredPrograms.length &&
													filteredPrograms.length > 0
												}
												onChange={handleSelectAll}
											/>
										</th>
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
									{filteredPrograms.map((program, index) => {
										// Debug: Log if we have issues with keys
										if (!program.id && !program.program_id && !program.code) {
											console.warn(
												"Program missing ID fields:",
												program,
												"index:",
												index
											);
										}

										const enrollmentPercent =
											program.max_enrollment > 0
												? Math.round(
														(program.current_enrollment /
															program.max_enrollment) *
															100
												  )
												: 0;

										// Create a unique key from multiple possible ID fields
										const uniqueKey =
											program.id ||
											program.program_id ||
											program.code ||
											`fallback-${index}`;

										return (
											<tr key={uniqueKey}>
												<td>
													<Form.Check
														type="checkbox"
														checked={selectedProgramIds.includes(
															program.program_id
														)}
														onChange={() =>
															handleSelectProgram(program.program_id)
														}
													/>
												</td>
												<td>
													<div>
														<div className="fw-semibold d-flex align-items-center">
															{program.program_name ||
																program.name ||
																program.title ||
																"Unnamed Program"}
															{program.is_featured && (
																<Badge bg="warning" size="sm" className="ms-2">
																	Featured
																</Badge>
															)}
														</div>
														<div className="text-muted small">
															{program.program_code ||
																program.code ||
																"No Code"}{" "}
															• {program.total_credits || program.credits || 0}{" "}
															Credits
														</div>
													</div>
												</td>
												<td>
													<div>
														<Badge bg="info" className="text-capitalize">
															{program.program_type}
														</Badge>
														<div className="text-muted small mt-1">
															<FaClock className="me-1" />
															{program.duration_years} year
															{program.duration_years > 1 ? "s" : ""}
															{program.duration_months > 0 &&
																` ${program.duration_months} month${
																	program.duration_months > 1 ? "s" : ""
																}`}
														</div>
													</div>
												</td>
												<td>
													<Badge bg="secondary">{program.department}</Badge>
												</td>
												<td>
													<div>
														<div className="small">
															{program.current_enrollment} /{" "}
															{program.max_enrollment} students
														</div>
														<ProgressBar
															variant={
																enrollmentPercent >= 90
																	? "danger"
																	: enrollmentPercent >= 70
																	? "warning"
																	: "success"
															}
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
															{program.rating && program.rating > 0
																? program.rating.toFixed(1)
																: "N/A"}
														</span>
													</div>
												</td>
												<td>
													<Badge
														bg={
															program.status === "Active"
																? "success"
																: program.status === "Inactive"
																? "danger"
																: "warning"
														}
													>
														{program.status}
													</Badge>
												</td>
												<td>
													<Dropdown>
														<Dropdown.Toggle
															variant="outline-secondary"
															size="sm"
															id={`dropdown-${program.program_id}`}
														>
															Actions
														</Dropdown.Toggle>
														<Dropdown.Menu>
															<Dropdown.Item
																key={`view-${program.program_id}`}
																onClick={() => handleViewProgram(program)}
															>
																<FaEye className="me-2" />
																View Details
															</Dropdown.Item>
															<Dropdown.Item
																key={`edit-${program.program_id}`}
																onClick={() => handleEditProgram(program)}
															>
																<FaEdit className="me-2" />
																Edit Program
															</Dropdown.Item>
															<Dropdown.Item
																key={`featured-${program.program_id}`}
																onClick={() =>
																	toggleFeatured(program.program_id)
																}
															>
																<FaStar className="me-2" />
																{program.is_featured
																	? "Remove Featured"
																	: "Mark Featured"}
															</Dropdown.Item>
															<Dropdown.Divider
																key={`divider-${program.program_id}`}
															/>
															<Dropdown.Item
																key={`delete-${program.program_id}`}
																className="text-danger"
																onClick={() =>
																	handleDeleteProgram(program.program_id)
																}
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
											<h5>
												{selectedProgram.program_name ||
													selectedProgram.name ||
													selectedProgram.title ||
													"Unnamed Program"}
											</h5>
											<p className="text-muted">
												{selectedProgram.description ||
													"No description available"}
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
									{selectedProgram.faculty &&
									selectedProgram.faculty.length > 0 ? (
										selectedProgram.faculty.map((facultyName, index) => (
											<div
												key={`faculty-${index}-${facultyName}`}
												className="d-flex align-items-center mb-2"
											>
												<Badge bg="primary" className="me-2">
													{index + 1}
												</Badge>
												{facultyName}
											</div>
										))
									) : (
										<p className="text-muted">No faculty assigned</p>
									)}
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
									<strong>
										{selectedProgram.program_name ||
											selectedProgram.name ||
											selectedProgram.title ||
											"Unnamed Program"}
									</strong>
									?
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

				{/* Program Form Modal */}
				<ProgramFormModal
					show={showFormModal}
					onHide={() => {
						setShowFormModal(false);
						setSelectedProgram(null);
						setIsEditing(false);
					}}
					program={isEditing ? selectedProgram : null}
					onSave={async (programData) => {
						try {
							if (isEditing) {
								await updateProgram(selectedProgram.program_id, programData);
							} else {
								await createProgram(programData);
							}
							setShowFormModal(false);
							setSelectedProgram(null);
							setIsEditing(false);
						} catch (error) {
							console.error("Error saving program:", error);
						}
					}}
				/>

				{/* Program View Modal */}
				<ProgramViewModal
					show={showViewModal}
					onHide={() => {
						setShowViewModal(false);
						setSelectedProgram(null);
					}}
					program={selectedProgram}
					onEdit={(program) => {
						setShowViewModal(false);
						setSelectedProgram(program);
						setIsEditing(true);
						setShowFormModal(true);
					}}
				/>
			</div>
		</AdminLayout>
	);
};

export default ProgramManagement;
