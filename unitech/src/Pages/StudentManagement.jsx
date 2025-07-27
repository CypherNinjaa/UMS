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
	Image,
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaFilter,
	FaDownload,
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

const StudentManagement = () => {
	// Sample student data
	const [students, setStudents] = useState([
		{
			id: 1,
			studentId: "STU2024001",
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@student.eduverse.edu",
			phone: "+1-555-1001",
			program: "Bachelor of Computer Science",
			year: "2nd Year",
			semester: "Fall 2024",
			status: "Active",
			gpa: 3.85,
			credits: 65,
			enrollmentDate: "2023-09-01",
			dateOfBirth: "2003-05-15",
			address: "123 College Ave, University City, UC 12345",
			guardianName: "Jane Doe",
			guardianPhone: "+1-555-1002",
			profileImage: null,
		},
		{
			id: 2,
			studentId: "STU2024002",
			firstName: "Emily",
			lastName: "Smith",
			email: "emily.smith@student.eduverse.edu",
			phone: "+1-555-1003",
			program: "Master of Business Administration",
			year: "1st Year",
			semester: "Fall 2024",
			status: "Active",
			gpa: 3.92,
			credits: 18,
			enrollmentDate: "2024-09-01",
			dateOfBirth: "1998-08-22",
			address: "456 Graduate Blvd, University City, UC 12345",
			guardianName: "Robert Smith",
			guardianPhone: "+1-555-1004",
			profileImage: null,
		},
		{
			id: 3,
			studentId: "STU2024003",
			firstName: "Michael",
			lastName: "Johnson",
			email: "michael.johnson@student.eduverse.edu",
			phone: "+1-555-1005",
			program: "Bachelor of Engineering",
			year: "3rd Year",
			semester: "Fall 2024",
			status: "Active",
			gpa: 3.67,
			credits: 95,
			enrollmentDate: "2022-09-01",
			dateOfBirth: "2002-12-10",
			address: "789 Engineering Way, University City, UC 12345",
			guardianName: "Lisa Johnson",
			guardianPhone: "+1-555-1006",
			profileImage: null,
		},
		{
			id: 4,
			studentId: "STU2024004",
			firstName: "Sarah",
			lastName: "Williams",
			email: "sarah.williams@student.eduverse.edu",
			phone: "+1-555-1007",
			program: "Bachelor of Biology",
			year: "4th Year",
			semester: "Fall 2024",
			status: "Active",
			gpa: 3.95,
			credits: 118,
			enrollmentDate: "2021-09-01",
			dateOfBirth: "2001-03-08",
			address: "321 Science Dr, University City, UC 12345",
			guardianName: "David Williams",
			guardianPhone: "+1-555-1008",
			profileImage: null,
		},
		{
			id: 5,
			studentId: "STU2024005",
			firstName: "David",
			lastName: "Brown",
			email: "david.brown@student.eduverse.edu",
			phone: "+1-555-1009",
			program: "Master of International Relations",
			year: "2nd Year",
			semester: "Fall 2024",
			status: "On Leave",
			gpa: 3.74,
			credits: 32,
			enrollmentDate: "2023-09-01",
			dateOfBirth: "1999-11-25",
			address: "654 Political Ave, University City, UC 12345",
			guardianName: "Mary Brown",
			guardianPhone: "+1-555-1010",
			profileImage: null,
		},
		{
			id: 6,
			studentId: "STU2024006",
			firstName: "Jessica",
			lastName: "Davis",
			email: "jessica.davis@student.eduverse.edu",
			phone: "+1-555-1011",
			program: "Certificate in Data Analytics",
			year: "1st Year",
			semester: "Spring 2025",
			status: "Enrolled",
			gpa: 0,
			credits: 0,
			enrollmentDate: "2025-01-15",
			dateOfBirth: "1997-06-30",
			address: "987 Analytics Ln, University City, UC 12345",
			guardianName: "Thomas Davis",
			guardianPhone: "+1-555-1012",
			profileImage: null,
		},
	]);

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

	// Get unique values for filters
	const programs = [
		"All",
		...new Set(students.map((student) => student.program)),
	];
	const years = ["All", ...new Set(students.map((student) => student.year))];
	const statuses = [
		"All",
		...new Set(students.map((student) => student.status)),
	];

	// Filter students
	const filteredStudents = students.filter((student) => {
		const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
		const matchesSearch =
			fullName.includes(searchTerm.toLowerCase()) ||
			student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
			student.program.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesProgram =
			selectedProgram === "All" || student.program === selectedProgram;
		const matchesYear = selectedYear === "All" || student.year === selectedYear;
		const matchesStatus =
			selectedStatus === "All" || student.status === selectedStatus;

		return matchesSearch && matchesProgram && matchesYear && matchesStatus;
	});

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

	const handleSaveStudent = (studentData) => {
		if (editingStudent) {
			// Update existing student
			setStudents(
				students.map((student) =>
					student.id === editingStudent.id
						? { ...studentData, id: editingStudent.id }
						: student
				)
			);
		} else {
			// Add new student
			setStudents([...students, { ...studentData, id: Date.now() }]);
		}
	};

	const confirmDelete = () => {
		setStudents(
			students.filter((student) => student.id !== selectedStudent.id)
		);
		setShowDeleteModal(false);
		setSelectedStudent(null);
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
	const averageGpa =
		students.filter((s) => s.gpa > 0).reduce((sum, s) => sum + s.gpa, 0) /
		students.filter((s) => s.gpa > 0).length;
	const totalCredits = students.reduce((sum, s) => sum + s.credits, 0);

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
							<Button variant="primary" className="me-2" onClick={handleAddNew}>
								<FaPlus className="me-2" />
								Add Student
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
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedProgram}
									onChange={(e) => setSelectedProgram(e.target.value)}
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
								<Form.Select
									value={selectedYear}
									onChange={(e) => setSelectedYear(e.target.value)}
								>
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
									{filteredStudents.length} of {students.length} students
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				{/* Students Table */}
				<Card>
					<Card.Body className="p-0">
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
														{student.firstName[0]}
														{student.lastName[0]}
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
												<div className="small fw-medium">{student.program}</div>
												<div className="mt-1">{getYearBadge(student.year)}</div>
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
													{student.phone}
												</div>
											</div>
										</td>
										<td>
											<div>
												<div className="d-flex align-items-center mb-1">
													<span className="me-2">GPA:</span>
													<Badge bg={getGpaColor(student.gpa)}>
														{student.gpa > 0 ? student.gpa.toFixed(2) : "N/A"}
													</Badge>
												</div>
												<div className="small text-muted">
													Credits: {student.credits}
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

						{filteredStudents.length === 0 && (
							<div className="text-center py-5">
								<h5>No students found</h5>
								<p className="text-muted">
									Try adjusting your search criteria or add a new student.
								</p>
								<Button variant="primary" onClick={handleAddNew}>
									<FaPlus className="me-2" />
									Add First Student
								</Button>
							</div>
						)}
					</Card.Body>
				</Card>

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
															{selectedStudent.gpa > 0
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
				/>
			</div>
		</AdminLayout>
	);
};

export default StudentManagement;
