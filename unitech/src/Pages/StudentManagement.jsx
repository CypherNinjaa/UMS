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
	Image,
	Spinner,
	Alert,
	Pagination,
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaFilter,
	FaUser,
	FaUsers,
	FaGraduationCap,
	FaCalendarAlt,
	FaEnvelope,
	FaPhone,
	FaMapMarkerAlt,
	FaIdCard,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import StudentFormModal from "../Components/Admin/Forms/StudentFormModal";
import useStudents from "../hooks/useStudents";

const StudentManagement = () => {
	const {
		students,
		loading,
		error,
		pagination,
		updateFilters,
		createStudent,
		updateStudent,
		deleteStudent,
		refresh,
	} = useStudents();

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedProgram, setSelectedProgram] = useState("All");
	const [selectedYear, setSelectedYear] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [editingStudent, setEditingStudent] = useState(null);
	const [activeTab, setActiveTab] = useState("personal");
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	// Get unique values for filters from students
	const programs = [
		"All",
		...new Set(students.map((student) => student.program).filter(Boolean)),
	];
	const years = [
		"All",
		...new Set(students.map((student) => student.year).filter(Boolean)),
	];
	const statuses = [
		"All",
		...new Set(students.map((student) => student.status).filter(Boolean)),
	];

	// Monitor students array for changes and refresh
	useEffect(() => {
		console.log("Students array updated, length:", students.length);
	}, [students]);

	// Monitor refresh trigger for additional refreshes
	useEffect(() => {
		if (refreshTrigger > 0) {
			console.log("Refresh trigger activated:", refreshTrigger);
			setTimeout(() => {
				refresh();
			}, 100);
		}
	}, [refreshTrigger, refresh]);

	// Apply search and filter logic manually instead of useEffect
	const applyFilters = React.useCallback(
		(searchValue, programValue, yearValue, statusValue) => {
			const filterParams = {};

			if (searchValue && searchValue.trim()) {
				filterParams.search = searchValue;
			}

			if (programValue && programValue !== "All") {
				filterParams.program = programValue;
			}

			if (yearValue && yearValue !== "All") {
				filterParams.year = yearValue;
			}

			if (statusValue && statusValue !== "All") {
				filterParams.status = statusValue;
			}

			updateFilters(filterParams);
		},
		[updateFilters]
	);

	// Handlers for filter changes
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		applyFilters(value, selectedProgram, selectedYear, selectedStatus);
	};

	const handleProgramChange = (e) => {
		const value = e.target.value;
		setSelectedProgram(value);
		applyFilters(searchTerm, value, selectedYear, selectedStatus);
	};

	const handleYearChange = (e) => {
		const value = e.target.value;
		setSelectedYear(value);
		applyFilters(searchTerm, selectedProgram, value, selectedStatus);
	};

	const handleStatusChange = (e) => {
		const value = e.target.value;
		setSelectedStatus(value);
		applyFilters(searchTerm, selectedProgram, selectedYear, value);
	};

	// Filter students for display (in case we want to apply additional client-side filtering)
	const filteredStudents = students;

	const handleDelete = (student) => {
		setSelectedStudent(student);
		setShowDeleteModal(true);
	};

	const handleViewDetails = (student) => {
		setSelectedStudent(student);
		setShowDetailsModal(true);
	};

	const handleEdit = (student) => {
		setEditingStudent(student);
		setShowFormModal(true);
	};

	const handleAddNew = () => {
		setEditingStudent(null);
		setShowFormModal(true);
	};

	const handleSaveStudent = async (studentData) => {
		try {
			if (editingStudent) {
				// Update existing student
				await updateStudent(editingStudent.id, studentData);
			} else {
				// Add new student
				await createStudent(studentData);
			}
		} catch (error) {
			console.error("Error saving student:", error);
			// Error handling is done in the hook
		}
	};

	const confirmDelete = async () => {
		try {
			await deleteStudent(selectedStudent.id);
			setShowDeleteModal(false);
			setSelectedStudent(null);
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

	// Handle student success with multiple refresh strategies
	const handleStudentSuccess = async () => {
		console.log("Student saved successfully, refreshing student list...");

		try {
			// Strategy 1: Direct refresh
			await refresh();
			console.log("Direct refresh completed");

			// Strategy 2: Trigger refresh via state
			setRefreshTrigger((prev) => prev + 1);
			console.log("Refresh trigger updated");

			// Strategy 3: Delayed refresh for better reliability
			setTimeout(async () => {
				console.log("Executing delayed refresh...");
				await refresh();
			}, 500);
		} catch (error) {
			console.error("Error refreshing students:", error);
		}
	};

	const getStatusBadge = (status) => {
		const variants = {
			Active: "success",
			"On Leave": "warning",
			Graduated: "info",
			Suspended: "danger",
			Enrolled: "primary",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	const getGpaColor = (gpa) => {
		if (!gpa || typeof gpa !== "number") return "secondary";
		if (gpa >= 3.7) return "success";
		if (gpa >= 3.0) return "warning";
		if (gpa >= 2.0) return "danger";
		return "secondary";
	};

	const getYearBadge = (year) => {
		const variants = {
			"1st Year": "primary",
			"2nd Year": "info",
			"3rd Year": "success",
			"4th Year": "warning",
		};
		return <Badge bg={variants[year] || "secondary"}>{year}</Badge>;
	};

	// Calculate statistics
	const totalStudents = students.length;
	const activeStudents = students.filter((s) => s.status === "Active").length;
	const validGpaStudents = students.filter(
		(s) => s.gpa && typeof s.gpa === "number" && s.gpa > 0
	);
	const averageGpa =
		validGpaStudents.length > 0
			? validGpaStudents.reduce((sum, s) => sum + s.gpa, 0) /
			  validGpaStudents.length
			: 0;
	const totalCredits = students.reduce(
		(sum, s) => sum + (s.totalCredits || 0),
		0
	);

	return (
		<AdminLayout>
			<div className="student-management">
				{/* Page Header */}
				<div className="page-header mb-4">
					<Row className="align-items-center">
						<Col>
							<h2 className="page-title">Student Management</h2>
							<p className="page-subtitle text-muted">
								Manage student records, enrollment, and academic progress
							</p>
						</Col>
						<Col xs="auto">
							<Button variant="primary" onClick={handleAddNew}>
								<FaPlus className="me-2" />
								Add Student
							</Button>
						</Col>
					</Row>
				</div>

				{/* Error Alert */}
				{error && (
					<Alert variant="danger" className="mb-4">
						<strong>Error:</strong> {error}
						<Button
							variant="outline-danger"
							size="sm"
							className="ms-2"
							onClick={refresh}
						>
							Retry
						</Button>
					</Alert>
				)}

				{/* Statistics Cards */}
				<Row className="mb-4">
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUsers className="stats-icon text-primary mb-2" size={24} />
								<h3 className="mb-0">{totalStudents}</h3>
								<p className="text-muted mb-0">Total Students</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUser className="stats-icon text-success mb-2" size={24} />
								<h3 className="mb-0">{activeStudents}</h3>
								<p className="text-muted mb-0">Active Students</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaGraduationCap
									className="stats-icon text-info mb-2"
									size={24}
								/>
								<h3 className="mb-0">{averageGpa.toFixed(2)}</h3>
								<p className="text-muted mb-0">Average GPA</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaIdCard className="stats-icon text-warning mb-2" size={24} />
								<h3 className="mb-0">{totalCredits}</h3>
								<p className="text-muted mb-0">Total Credits</p>
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
										placeholder="Search by name, email, ID, or program..."
										value={searchTerm}
										onChange={handleSearchChange}
									/>
								</InputGroup>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedProgram}
									onChange={handleProgramChange}
								>
									{programs.map((program) => (
										<option key={program} value={program}>
											{program === "All"
												? "All Programs"
												: program.length > 20
												? program.substring(0, 20) + "..."
												: program}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}>
								<Form.Select value={selectedYear} onChange={handleYearChange}>
									{years.map((year) => (
										<option key={year} value={year}>
											{year === "All" ? "All Years" : year}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedStatus}
									onChange={handleStatusChange}
								>
									{statuses.map((status) => (
										<option key={status} value={status}>
											{status === "All" ? "All Status" : status}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2} className="text-end">
								<div className="text-muted small">
									{students.length} of {pagination.totalItems || 0} students
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				{/* Students Table */}
				<Card>
					<Card.Body className="p-0">
						{loading ? (
							<div className="text-center py-5">
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<p className="mt-2 text-muted">Loading students...</p>
							</div>
						) : (
							<Table responsive hover className="mb-0">
								<thead className="bg-light">
									<tr>
										<th>Student</th>
										<th>Program & Year</th>
										<th>Contact</th>
										<th>Academic Progress</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredStudents.map((student) => (
										<tr key={student.id}>
											<td>
												<div className="d-flex align-items-center">
													<div className="student-avatar me-3">
														<div
															className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
															style={{ width: "40px", height: "40px" }}
														>
															{student.firstName?.[0] || "?"}
															{student.lastName?.[0] || "?"}
														</div>
													</div>
													<div>
														<div className="fw-semibold">
															{student.firstName} {student.lastName}
														</div>
														<div className="text-muted small">
															{student.studentId}
														</div>
													</div>
												</div>
											</td>
											<td>
												<div>
													<div className="small fw-medium">
														{student.program}
													</div>
													<div className="mt-1">
														{getYearBadge(student.year)}
													</div>
												</div>
											</td>
											<td>
												<div>
													<div className="small">
														<FaEnvelope className="me-1" />
														{student.email}
													</div>
													<div className="small text-muted">
														<FaPhone className="me-1" />
														{student.phone || "N/A"}
													</div>
												</div>
											</td>
											<td>
												<div>
													<div className="d-flex align-items-center mb-1">
														<span className="me-2">GPA:</span>
														<Badge bg={getGpaColor(student.gpa)}>
															{student.gpa &&
															typeof student.gpa === "number" &&
															student.gpa > 0
																? student.gpa.toFixed(2)
																: "N/A"}
														</Badge>
													</div>
													<div className="small text-muted">
														Credits: {student.totalCredits || 0}
													</div>
												</div>
											</td>
											<td>{getStatusBadge(student.status)}</td>
											<td>
												<Dropdown>
													<Dropdown.Toggle
														variant="outline-secondary"
														size="sm"
														id={`dropdown-${student.id}`}
													>
														Actions
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item
															onClick={() => handleViewDetails(student)}
														>
															<FaEye className="me-2" />
															View Profile
														</Dropdown.Item>
														<Dropdown.Item onClick={() => handleEdit(student)}>
															<FaEdit className="me-2" />
															Edit Student
														</Dropdown.Item>
														<Dropdown.Item>
															<FaGraduationCap className="me-2" />
															Academic Records
														</Dropdown.Item>
														<Dropdown.Divider />
														<Dropdown.Item
															className="text-danger"
															onClick={() => handleDelete(student)}
														>
															<FaTrash className="me-2" />
															Delete
														</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}

						{!loading && filteredStudents.length === 0 && (
							<div className="text-center py-5">
								<h5>No students found</h5>
								<p className="text-muted">
									{students.length === 0
										? "No students have been added yet."
										: "Try adjusting your search criteria or add a new student."}
								</p>
								<Button variant="primary" onClick={handleAddNew}>
									<FaPlus className="me-2" />
									Add First Student
								</Button>
							</div>
						)}
					</Card.Body>
				</Card>

				{/* Pagination */}
				{!loading && filteredStudents.length > 0 && pagination && (
					<div className="d-flex justify-content-between align-items-center mt-3">
						<div className="text-muted">
							Showing{" "}
							{((pagination.currentPage || 1) - 1) *
								(pagination.itemsPerPage || 10) +
								1}{" "}
							to{" "}
							{Math.min(
								(pagination.currentPage || 1) * (pagination.itemsPerPage || 10),
								pagination.totalItems || 0
							)}{" "}
							of {pagination.totalItems || 0} students
						</div>
						<div className="d-flex align-items-center">
							<span className="me-2 text-muted">Per page:</span>
							<Form.Select
								size="sm"
								style={{ width: "auto" }}
								value={pagination.itemsPerPage || 10}
								onChange={(e) =>
									updateFilters({ limit: parseInt(e.target.value), page: 1 })
								}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
							</Form.Select>
							<Pagination className="ms-3 mb-0">
								<Pagination.Prev
									disabled={(pagination.currentPage || 1) <= 1}
									onClick={() =>
										(pagination.currentPage || 1) > 1 &&
										updateFilters({ page: (pagination.currentPage || 1) - 1 })
									}
								/>
								{[...Array(pagination.totalPages || 1)].map((_, index) => {
									const page = index + 1;
									const currentPage = pagination.currentPage || 1;
									const totalPages = pagination.totalPages || 1;
									if (
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 2 && page <= currentPage + 2)
									) {
										return (
											<Pagination.Item
												key={page}
												active={page === currentPage}
												onClick={() => updateFilters({ page })}
											>
												{page}
											</Pagination.Item>
										);
									} else if (
										page === currentPage - 3 ||
										page === currentPage + 3
									) {
										return <Pagination.Ellipsis key={page} />;
									}
									return null;
								})}
								<Pagination.Next
									disabled={
										(pagination.currentPage || 1) >=
										(pagination.totalPages || 1)
									}
									onClick={() =>
										(pagination.currentPage || 1) <
											(pagination.totalPages || 1) &&
										updateFilters({ page: (pagination.currentPage || 1) + 1 })
									}
								/>
							</Pagination>
						</div>
					</div>
				)}

				{/* Student Details Modal */}
				<Modal
					size="lg"
					show={showDetailsModal}
					onHide={() => setShowDetailsModal(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Student Profile</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedStudent && (
							<Tabs
								activeKey={activeTab}
								onSelect={(k) => setActiveTab(k)}
								className="mb-3"
							>
								<Tab eventKey="personal" title="Personal Info">
									<Row>
										<Col md={4} className="text-center">
											<div className="student-profile-avatar mb-3">
												<div
													className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
													style={{
														width: "100px",
														height: "100px",
														fontSize: "2rem",
													}}
												>
													{selectedStudent.firstName[0]}
													{selectedStudent.lastName[0]}
												</div>
											</div>
											<h5>
												{selectedStudent.firstName} {selectedStudent.lastName}
											</h5>
											<p className="text-muted">{selectedStudent.studentId}</p>
											{getStatusBadge(selectedStudent.status)}
										</Col>
										<Col md={8}>
											<Row>
												<Col sm={6} className="mb-3">
													<label className="fw-semibold">Email:</label>
													<div>{selectedStudent.email}</div>
												</Col>
												<Col sm={6} className="mb-3">
													<label className="fw-semibold">Phone:</label>
													<div>{selectedStudent.phone}</div>
												</Col>
												<Col sm={6} className="mb-3">
													<label className="fw-semibold">Date of Birth:</label>
													<div>
														{new Date(
															selectedStudent.dateOfBirth
														).toLocaleDateString()}
													</div>
												</Col>
												<Col sm={6} className="mb-3">
													<label className="fw-semibold">
														Enrollment Date:
													</label>
													<div>
														{new Date(
															selectedStudent.enrollmentDate
														).toLocaleDateString()}
													</div>
												</Col>
												<Col sm={12} className="mb-3">
													<label className="fw-semibold">Address:</label>
													<div>{selectedStudent.address}</div>
												</Col>
											</Row>
										</Col>
									</Row>
								</Tab>
								<Tab eventKey="academic" title="Academic Info">
									<Row>
										<Col md={6}>
											<Card className="bg-light">
												<Card.Body>
													<h6>Program Information</h6>
													<div className="mb-2">
														<strong>Program:</strong> {selectedStudent.program}
													</div>
													<div className="mb-2">
														<strong>Year:</strong>{" "}
														{getYearBadge(selectedStudent.year)}
													</div>
													<div className="mb-2">
														<strong>Semester:</strong>{" "}
														{selectedStudent.semester}
													</div>
													<div className="mb-2">
														<strong>Status:</strong>{" "}
														{getStatusBadge(selectedStudent.status)}
													</div>
												</Card.Body>
											</Card>
										</Col>
										<Col md={6}>
											<Card className="bg-light">
												<Card.Body>
													<h6>Academic Performance</h6>
													<div className="mb-2">
														<strong>Current GPA:</strong>
														<Badge
															bg={getGpaColor(selectedStudent.gpa)}
															className="ms-2"
														>
															{selectedStudent.gpa &&
															typeof selectedStudent.gpa === "number" &&
															selectedStudent.gpa > 0
																? selectedStudent.gpa.toFixed(2)
																: "N/A"}
														</Badge>
													</div>
													<div className="mb-2">
														<strong>Total Credits:</strong>{" "}
														{selectedStudent.credits}
													</div>
													<div className="mb-2">
														<strong>Enrollment Date:</strong>{" "}
														{new Date(
															selectedStudent.enrollmentDate
														).toLocaleDateString()}
													</div>
												</Card.Body>
											</Card>
										</Col>
									</Row>
								</Tab>
								<Tab eventKey="guardian" title="Guardian Info">
									<h6>Guardian/Emergency Contact</h6>
									<Row>
										<Col sm={6}>
											<label className="fw-semibold">Guardian Name:</label>
											<div>{selectedStudent.guardianName}</div>
										</Col>
										<Col sm={6}>
											<label className="fw-semibold">Guardian Phone:</label>
											<div>{selectedStudent.guardianPhone}</div>
										</Col>
									</Row>
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
							Edit Student
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Delete Confirmation Modal */}
				<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedStudent && (
							<>
								<p>
									Are you sure you want to delete the student record for{" "}
									<strong>
										{selectedStudent.firstName} {selectedStudent.lastName}
									</strong>
									?
								</p>
								<div className="alert alert-warning">
									<strong>Warning:</strong> This will permanently remove all
									academic records and enrollment data.
								</div>
								<p className="text-muted small">
									This action cannot be undone. Consider suspending the student
									instead if this is temporary.
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
							Delete Student
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Student Form Modal */}
				<StudentFormModal
					show={showFormModal}
					onHide={() => setShowFormModal(false)}
					student={editingStudent}
					onSave={handleSaveStudent}
					onSuccess={handleStudentSuccess}
				/>
			</div>
		</AdminLayout>
	);
};

export default StudentManagement;
