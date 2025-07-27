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
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaFilter,
	FaDownload,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import FacultyFormModal from "../Components/Admin/Forms/FacultyFormModal";

const FacultyManagement = () => {
	// Sample faculty data (expanded from our original data)
	const [faculty, setFaculty] = useState([
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			title: "Professor of Computer Science",
			department: "Computer Science",
			specialization: "Artificial Intelligence, Machine Learning",
			email: "sarah.johnson@eduverse.edu",
			phone: "+1-555-0101",
			status: "Active",
			joinDate: "2019-08-15",
			featured: true,
		},
		{
			id: 2,
			name: "Dr. Michael Chen",
			title: "Associate Professor of Business",
			department: "Business Administration",
			specialization: "Strategic Management, Entrepreneurship",
			email: "michael.chen@eduverse.edu",
			phone: "+1-555-0102",
			status: "Active",
			joinDate: "2020-01-10",
			featured: false,
		},
		{
			id: 3,
			name: "Dr. Emily Rodriguez",
			title: "Professor of Biology",
			department: "Biology",
			specialization: "Genetics, Biotechnology",
			email: "emily.rodriguez@eduverse.edu",
			phone: "+1-555-0103",
			status: "Active",
			joinDate: "2018-03-22",
			featured: true,
		},
		{
			id: 4,
			name: "Dr. James Wilson",
			title: "Assistant Professor of Engineering",
			department: "Engineering",
			specialization: "Robotics, Automation",
			email: "james.wilson@eduverse.edu",
			phone: "+1-555-0104",
			status: "Active",
			joinDate: "2021-09-01",
			featured: false,
		},
		{
			id: 5,
			name: "Dr. Lisa Zhang",
			title: "Professor of International Relations",
			department: "Political Science",
			specialization: "International Diplomacy, Global Politics",
			email: "lisa.zhang@eduverse.edu",
			phone: "+1-555-0105",
			status: "Active",
			joinDate: "2017-02-14",
			featured: true,
		},
		{
			id: 6,
			name: "Dr. Robert Taylor",
			title: "Associate Professor of Mathematics",
			department: "Mathematics",
			specialization: "Applied Mathematics, Statistics",
			email: "robert.taylor@eduverse.edu",
			phone: "+1-555-0106",
			status: "Active",
			joinDate: "2020-11-30",
			featured: false,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [selectedFaculty, setSelectedFaculty] = useState(null);
	const [editingFaculty, setEditingFaculty] = useState(null);

	// Get unique departments
	const departments = [
		"All",
		...new Set(faculty.map((member) => member.department)),
	];

	// Filter faculty
	const filteredFaculty = faculty.filter((member) => {
		const matchesSearch =
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDepartment =
			selectedDepartment === "All" || member.department === selectedDepartment;

		return matchesSearch && matchesDepartment;
	});

	const handleDelete = (facultyMember) => {
		setSelectedFaculty(facultyMember);
		setShowDeleteModal(true);
	};

	const handleEdit = (facultyMember) => {
		setEditingFaculty(facultyMember);
		setShowFormModal(true);
	};

	const handleAddNew = () => {
		setEditingFaculty(null);
		setShowFormModal(true);
	};

	const handleSaveFaculty = (facultyData) => {
		if (editingFaculty) {
			// Update existing faculty
			setFaculty(
				faculty.map((member) =>
					member.id === editingFaculty.id
						? { ...facultyData, id: editingFaculty.id }
						: member
				)
			);
		} else {
			// Add new faculty
			setFaculty([...faculty, { ...facultyData, id: Date.now() }]);
		}
	};

	const confirmDelete = () => {
		setFaculty(faculty.filter((member) => member.id !== selectedFaculty.id));
		setShowDeleteModal(false);
		setSelectedFaculty(null);
	};

	const getStatusBadge = (status) => {
		const variants = {
			Active: "success",
			Inactive: "secondary",
			Pending: "warning",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	return (
		<AdminLayout>
			<div className="faculty-management">
				{/* Page Header */}
				<div className="page-header mb-4">
					<Row className="align-items-center">
						<Col>
							<h2 className="page-title">Faculty Management</h2>
							<p className="page-subtitle text-muted">
								Manage faculty members, their profiles, and assignments
							</p>
						</Col>
						<Col xs="auto">
							<Button variant="primary" className="me-2" onClick={handleAddNew}>
								<FaPlus className="me-2" />
								Add Faculty
							</Button>
							<Button variant="outline-secondary">
								<FaDownload className="me-2" />
								Export
							</Button>
						</Col>
					</Row>
				</div>

				{/* Filters and Search */}
				<Card className="mb-4">
					<Card.Body>
						<Row className="align-items-center">
							<Col md={6}>
								<InputGroup>
									<InputGroup.Text>
										<FaSearch />
									</InputGroup.Text>
									<Form.Control
										type="text"
										placeholder="Search faculty by name, email, or department..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col md={3}>
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
							<Col md={3} className="text-end">
								<Button variant="outline-primary" size="sm" className="me-2">
									<FaFilter className="me-1" />
									More Filters
								</Button>
								<span className="text-muted small">
									{filteredFaculty.length} of {faculty.length} faculty
								</span>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				{/* Faculty Table */}
				<Card>
					<Card.Body className="p-0">
						<Table responsive hover className="mb-0">
							<thead className="bg-light">
								<tr>
									<th>Faculty Member</th>
									<th>Department</th>
									<th>Specialization</th>
									<th>Contact</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredFaculty.map((member) => (
									<tr key={member.id}>
										<td>
											<div>
												<div className="fw-semibold">{member.name}</div>
												<div className="text-muted small">{member.title}</div>
												{member.featured && (
													<Badge bg="warning" size="sm" className="mt-1">
														Distinguished
													</Badge>
												)}
											</div>
										</td>
										<td>
											<Badge bg="secondary">{member.department}</Badge>
										</td>
										<td>
											<span className="text-muted small">
												{member.specialization}
											</span>
										</td>
										<td>
											<div>
												<div className="small">{member.email}</div>
												<div className="small text-muted">{member.phone}</div>
											</div>
										</td>
										<td>{getStatusBadge(member.status)}</td>
										<td>
											<Dropdown>
												<Dropdown.Toggle
													variant="outline-secondary"
													size="sm"
													id={`dropdown-${member.id}`}
												>
													Actions
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item>
														<FaEye className="me-2" />
														View Details
													</Dropdown.Item>
													<Dropdown.Item onClick={() => handleEdit(member)}>
														<FaEdit className="me-2" />
														Edit Profile
													</Dropdown.Item>
													<Dropdown.Divider />
													<Dropdown.Item
														className="text-danger"
														onClick={() => handleDelete(member)}
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

						{filteredFaculty.length === 0 && (
							<div className="text-center py-5">
								<h5>No faculty members found</h5>
								<p className="text-muted">
									Try adjusting your search criteria or add a new faculty
									member.
								</p>
								<Button variant="primary" onClick={handleAddNew}>
									<FaPlus className="me-2" />
									Add First Faculty Member
								</Button>
							</div>
						)}
					</Card.Body>
				</Card>

				{/* Delete Confirmation Modal */}
				<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedFaculty && (
							<>
								<p>
									Are you sure you want to delete{" "}
									<strong>{selectedFaculty.name}</strong>?
								</p>
								<p className="text-muted small">
									This action cannot be undone. All associated data will be
									permanently removed.
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
							Delete
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Faculty Form Modal */}
				<FacultyFormModal
					show={showFormModal}
					onHide={() => setShowFormModal(false)}
					faculty={editingFaculty}
					onSave={handleSaveFaculty}
				/>
			</div>
		</AdminLayout>
	);
};

export default FacultyManagement;
