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
	FaDownload,
	FaStar,
	FaRegStar,
	FaUsers,
	FaUserCheck,
	FaUserClock,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";
import FacultyFormModal from "../Components/Admin/Forms/FacultyFormModal";
import FacultyViewModal from "../Components/Admin/Forms/FacultyViewModal";
import { useFaculty } from "../hooks/useFaculty";
import FacultyService from "../services/FacultyService";

const FacultyManagement = () => {
	// Use Faculty Context for dynamic data
	const {
		faculty,
		departments,
		loading,
		error,
		// pagination, // TODO: Add pagination controls
		filters,
		actions,
	} = useFaculty();

	// Extract pagination and action functions
	// const { currentPage, totalPages, totalItems, itemsPerPage } = pagination; // TODO: Add pagination controls
	const {
		createFaculty,
		updateFaculty,
		deleteFaculty,
		bulkDeleteFaculty,
		toggleFeatured,
		fetchFaculty,
		fetchDepartments,
		clearError,
	} = actions;

	// Local state for UI interactions
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showFormModal, setShowFormModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [selectedFaculty, setSelectedFaculty] = useState(null);
	const [editingFaculty, setEditingFaculty] = useState(null);
	const [viewingFaculty, setViewingFaculty] = useState(null);
	const [selectedForBulkDelete, setSelectedForBulkDelete] = useState([]);
	const [localSearchTerm, setLocalSearchTerm] = useState(filters.search);
	const [localDepartment, setLocalDepartment] = useState(filters.department);
	const [lastFacultyCount, setLastFacultyCount] = useState(0);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	// Filtered faculty based on current filters
	const filteredFaculty = faculty.filter((member) => {
		const matchesSearch =
			localSearchTerm === "" ||
			member.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(localSearchTerm.toLowerCase());
		const matchesDepartment =
			localDepartment === "All" || member.department === localDepartment;

		return matchesSearch && matchesDepartment;
	});

	// Calculate dynamic statistics from actual faculty data
	const dynamicStatistics = {
		totalFaculty: faculty.length,
		activeFaculty: faculty.filter((member) => member.status === "Active")
			.length,
		featuredFaculty: faculty.filter((member) => member.featured === true)
			.length,
		pendingFaculty: faculty.filter((member) => member.status === "Pending")
			.length,
	};

	// Load data on component mount
	useEffect(() => {
		fetchFaculty({
			search: "",
			department: "All",
			page: 1,
			limit: 100, // Fetch more data at once to reduce API calls
		});
		fetchDepartments();
	}, [fetchFaculty, fetchDepartments]); // Include dependencies

	// Add useEffect to watch for faculty list changes and update UI
	useEffect(() => {
		// Force re-render when faculty list changes
		// This ensures the UI updates immediately after creating/updating faculty
		if (faculty.length > 0) {
			console.log("Faculty list updated:", faculty.length, "members");
		}
		// Update the last faculty count
		setLastFacultyCount(faculty.length);
	}, [faculty, setLastFacultyCount]); // Watch for changes in faculty array

	// Add useEffect to track faculty count changes
	useEffect(() => {
		if (faculty.length !== lastFacultyCount && faculty.length > 0) {
			console.log(
				`Faculty count changed from ${lastFacultyCount} to ${faculty.length}`
			);
			if (faculty.length > lastFacultyCount) {
				console.log("New faculty member added!");
			}
		}
	}, [faculty.length, lastFacultyCount]);

	// Add useEffect to handle refresh trigger
	useEffect(() => {
		if (refreshTrigger > 0) {
			console.log("Refresh trigger activated:", refreshTrigger);
			// Force re-fetch faculty data
			fetchFaculty({
				search: localSearchTerm,
				department: localDepartment === "All" ? "" : localDepartment,
				page: 1,
				limit: 100,
			});
		}
	}, [refreshTrigger, fetchFaculty, localSearchTerm, localDepartment]);

	// Function to refresh faculty list
	const refreshFacultyList = async () => {
		try {
			await fetchFaculty({
				search: localSearchTerm,
				department: localDepartment === "All" ? "" : localDepartment,
				page: 1,
				limit: 100,
			});
		} catch (error) {
			console.error("Error refreshing faculty list:", error);
		}
	};

	// Function to handle successful faculty save operations
	const handleFacultySuccess = async () => {
		try {
			console.log("Faculty operation successful, refreshing list...");

			// Multiple refresh strategies to ensure the list updates

			// 1. Force refresh the faculty list
			await refreshFacultyList();

			// 2. Trigger a refresh by updating the trigger state
			setRefreshTrigger((prev) => prev + 1);

			// 3. Alternative: Directly call fetchFaculty again
			setTimeout(async () => {
				await fetchFaculty({
					search: "",
					department: "All",
					page: 1,
					limit: 100,
				});
			}, 100);

			// 4. Force a small delay to ensure state updates
			setTimeout(() => {
				console.log("Faculty list refreshed. Current count:", faculty.length);
			}, 500);
		} catch (error) {
			console.error("Error refreshing after faculty save:", error);
		}
	};

	// Use client-side filtering for better performance
	// Only make API calls for complex searches or when needed

	const handleDelete = (facultyMember) => {
		setSelectedFaculty(facultyMember);
		setShowDeleteModal(true);
	};

	const handleEdit = (facultyMember) => {
		setEditingFaculty(facultyMember);
		setShowFormModal(true);
	};

	const handleView = (facultyMember) => {
		setViewingFaculty(facultyMember);
		setShowViewModal(true);
	};

	const handleEditFromView = (facultyMember) => {
		setShowViewModal(false);
		setEditingFaculty(facultyMember);
		setShowFormModal(true);
	};

	const handleAddNew = () => {
		setEditingFaculty(null);
		setShowFormModal(true);
	};

	const handleSaveFaculty = async (facultyData) => {
		try {
			// Separate faculty data from login data
			const {
				createLogin,
				loginEmail,
				password,
				confirmPassword,
				// generatePassword, // not used in save operation
				...facultyInfo
			} = facultyData;
			const loginData = {
				createLogin,
				loginEmail,
				password,
				confirmPassword,
			};

			if (editingFaculty) {
				// Update existing faculty
				if (createLogin) {
					await FacultyService.updateFacultyWithLogin(
						editingFaculty.id,
						facultyInfo,
						loginData
					);
				} else {
					await updateFaculty(editingFaculty.id, facultyInfo);
				}
			} else {
				// Add new faculty
				if (createLogin) {
					// Use FacultyService directly for login creation
					await FacultyService.createFacultyWithLogin(facultyInfo, loginData);
				} else {
					await createFaculty(facultyInfo);
				}
			}

			setShowFormModal(false);
			setEditingFaculty(null);

			// Show success message
			const message = editingFaculty
				? "Faculty updated successfully" +
				  (createLogin ? " with login credentials" : "")
				: "Faculty added successfully" +
				  (createLogin ? " with login credentials" : "");

			console.log(message);

			// Small delay to ensure UI updates properly
			setTimeout(() => {
				console.log("Faculty list should now show", faculty.length, "members");
			}, 100);
		} catch (error) {
			console.error("Error saving faculty:", error);
			// Error will be handled by the context
		}
	};

	const confirmDelete = async () => {
		try {
			if (selectedForBulkDelete.length > 0) {
				await bulkDeleteFaculty(selectedForBulkDelete);
				setSelectedForBulkDelete([]);
			} else if (selectedFaculty) {
				await deleteFaculty(selectedFaculty.id);
			}
			setShowDeleteModal(false);
			setSelectedFaculty(null);
		} catch (error) {
			console.error("Error deleting faculty:", error);
		}
	};

	const handleToggleFeatured = async (facultyMember) => {
		try {
			await toggleFeatured(facultyMember.id);
		} catch (error) {
			console.error("Error toggling featured status:", error);
		}
	};

	const handleBulkDelete = () => {
		if (selectedForBulkDelete.length > 0) {
			setShowDeleteModal(true);
		}
	};

	const handleSelectForBulkDelete = (facultyId) => {
		setSelectedForBulkDelete((prev) =>
			prev.includes(facultyId)
				? prev.filter((id) => id !== facultyId)
				: [...prev, facultyId]
		);
	};

	const handleSelectAllForBulkDelete = () => {
		if (selectedForBulkDelete.length === filteredFaculty.length) {
			setSelectedForBulkDelete([]);
		} else {
			setSelectedForBulkDelete(filteredFaculty.map((f) => f.id));
		}
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
							{selectedForBulkDelete.length > 0 && (
								<Button
									variant="danger"
									className="me-2"
									onClick={handleBulkDelete}
								>
									<FaTrash className="me-2" />
									Delete Selected ({selectedForBulkDelete.length})
								</Button>
							)}
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

				{/* Statistics Cards */}
				<Row className="mb-4">
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUsers className="stats-icon text-primary mb-2" size={24} />
								<h3 className="mb-0">{dynamicStatistics.totalFaculty}</h3>
								<p className="text-muted mb-0">Total Faculty</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUserCheck
									className="stats-icon text-success mb-2"
									size={24}
								/>
								<h3 className="mb-0">{dynamicStatistics.activeFaculty}</h3>
								<p className="text-muted mb-0">Active Faculty</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaStar className="stats-icon text-warning mb-2" size={24} />
								<h3 className="mb-0">{dynamicStatistics.featuredFaculty}</h3>
								<p className="text-muted mb-0">Distinguished</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaUserClock className="stats-icon text-info mb-2" size={24} />
								<h3 className="mb-0">{dynamicStatistics.pendingFaculty}</h3>
								<p className="text-muted mb-0">Pending</p>
							</Card.Body>
						</Card>
					</Col>
				</Row>

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
										value={localSearchTerm}
										onChange={(e) => setLocalSearchTerm(e.target.value)}
									/>
								</InputGroup>
							</Col>
							<Col md={3}>
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
						{loading ? (
							<div className="text-center py-5">
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<p className="mt-2 text-muted">Loading faculty data...</p>
							</div>
						) : (
							<Table responsive hover className="mb-0">
								<thead className="bg-light">
									<tr>
										<th style={{ width: "50px" }}>
											<Form.Check
												type="checkbox"
												checked={
													selectedForBulkDelete.length ===
														filteredFaculty.length && filteredFaculty.length > 0
												}
												onChange={handleSelectAllForBulkDelete}
											/>
										</th>
										<th>Faculty Member</th>
										<th>Department</th>
										<th>Specialization</th>
										<th>Contact</th>
										<th>Status</th>
										<th>Featured</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{filteredFaculty.map((member) => (
										<tr key={member.id}>
											<td>
												<Form.Check
													type="checkbox"
													checked={selectedForBulkDelete.includes(member.id)}
													onChange={() => handleSelectForBulkDelete(member.id)}
												/>
											</td>
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
												<Button
													variant="link"
													size="sm"
													className="p-0"
													onClick={() => handleToggleFeatured(member)}
												>
													{member.featured ? (
														<FaStar className="text-warning" />
													) : (
														<FaRegStar className="text-muted" />
													)}
												</Button>
											</td>
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
														<Dropdown.Item onClick={() => handleView(member)}>
															<FaEye className="me-2" />
															View Details
														</Dropdown.Item>
														<Dropdown.Item onClick={() => handleEdit(member)}>
															<FaEdit className="me-2" />
															Edit Profile
														</Dropdown.Item>
														<Dropdown.Item
															onClick={() => handleToggleFeatured(member)}
														>
															{member.featured ? (
																<FaRegStar className="me-2" />
															) : (
																<FaStar className="me-2" />
															)}
															{member.featured
																? "Remove Featured"
																: "Make Featured"}
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
						)}

						{!loading && filteredFaculty.length === 0 && (
							<div className="text-center py-5">
								<h5>No faculty members found</h5>
								<p className="text-muted">
									{localSearchTerm || localDepartment !== "All"
										? "Try adjusting your search criteria or filters."
										: "Add your first faculty member to get started."}
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
					onSuccess={handleFacultySuccess}
				/>

				{/* Faculty View Modal */}
				<FacultyViewModal
					show={showViewModal}
					onHide={() => setShowViewModal(false)}
					faculty={viewingFaculty}
					onEdit={handleEditFromView}
				/>
			</div>
		</AdminLayout>
	);
};

export default FacultyManagement;
