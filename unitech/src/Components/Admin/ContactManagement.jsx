import React, { useState, useEffect, useCallback } from "react";
import {
	Row,
	Col,
	Card,
	Table,
	Button,
	Form,
	Badge,
	Modal,
	Alert,
	Pagination,
	Spinner,
	InputGroup,
} from "react-bootstrap";
import {
	FaEye,
	FaEdit,
	FaTrash,
	FaSearch,
	FaFilter,
	FaEnvelope,
	FaPhone,
	FaBuilding,
	FaClock,
} from "react-icons/fa";

const ContactManagement = () => {
	const [contacts, setContacts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);

	// Filters and search
	const [filters, setFilters] = useState({
		search: "",
		status: "",
		enquiryType: "",
		priority: "",
	});

	// Stats
	const [stats, setStats] = useState({});

	// Fetch contacts data
	const fetchContacts = useCallback(
		async (page = 1) => {
			try {
				setLoading(true);
				setError("");

				const queryParams = new URLSearchParams({
					page: page.toString(),
					limit: "10",
					...filters,
				});

				const response = await fetch(
					`http://localhost:3000/api/contacts?${queryParams}`
				);
				const data = await response.json();

				if (response.ok && data.success) {
					setContacts(data.data.contacts);
					setCurrentPage(data.data.pagination.currentPage);
					setTotalPages(data.data.pagination.totalPages);
					setTotalItems(data.data.pagination.totalItems);
				} else {
					setError(data.message || "Failed to fetch contacts");
				}
			} catch (err) {
				console.error("Error fetching contacts:", err);
				setError("Network error while fetching contacts");
			} finally {
				setLoading(false);
			}
		},
		[filters]
	);

	// Fetch contact statistics
	const fetchStats = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/contacts/stats");
			const data = await response.json();

			if (response.ok && data.success) {
				setStats(data.data);
			}
		} catch (err) {
			console.error("Error fetching contact stats:", err);
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchContacts();
		fetchStats();
	}, [fetchContacts]);

	// Refetch when filters change
	useEffect(() => {
		if (currentPage === 1) {
			fetchContacts();
		} else {
			setCurrentPage(1);
		}
	}, [filters, currentPage, fetchContacts]);

	// Refetch when page changes
	useEffect(() => {
		if (currentPage > 1) {
			fetchContacts(currentPage);
		}
	}, [currentPage, fetchContacts]);

	// Handle filter changes
	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	// View contact details
	const viewContact = (contact) => {
		setSelectedContact(contact);
		setShowModal(true);
	};

	// Update contact status
	const updateContact = async (contactId, updateData) => {
		try {
			setIsUpdating(true);
			const response = await fetch(
				`http://localhost:3000/api/contacts/${contactId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updateData),
				}
			);

			const data = await response.json();

			if (response.ok && data.success) {
				// Refresh the contacts list
				fetchContacts(currentPage);
				fetchStats();
				setShowModal(false);
				setSelectedContact(null);
			} else {
				setError(data.message || "Failed to update contact");
			}
		} catch (err) {
			console.error("Error updating contact:", err);
			setError("Network error while updating contact");
		} finally {
			setIsUpdating(false);
		}
	};

	// Delete contact
	const deleteContact = async (contactId) => {
		if (!window.confirm("Are you sure you want to delete this contact?")) {
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:3000/api/contacts/${contactId}`,
				{
					method: "DELETE",
				}
			);

			const data = await response.json();

			if (response.ok && data.success) {
				fetchContacts(currentPage);
				fetchStats();
			} else {
				setError(data.message || "Failed to delete contact");
			}
		} catch (err) {
			console.error("Error deleting contact:", err);
			setError("Network error while deleting contact");
		}
	};

	// Get status badge variant
	const getStatusVariant = (status) => {
		switch (status) {
			case "pending":
				return "warning";
			case "reviewed":
				return "info";
			case "responded":
				return "success";
			case "closed":
				return "secondary";
			default:
				return "light";
		}
	};

	// Get priority badge variant
	const getPriorityVariant = (priority) => {
		switch (priority) {
			case "urgent":
				return "danger";
			case "high":
				return "warning";
			case "medium":
				return "info";
			case "low":
				return "secondary";
			default:
				return "light";
		}
	};

	return (
		<div className="contact-management">
			{/* Page Header */}
			<div className="d-flex justify-content-between align-items-center mb-4">
				<div>
					<h2>Contact Management</h2>
					<p className="text-muted mb-0">
						Manage customer inquiries and support requests
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<Row className="mb-4">
				<Col lg={3} md={6} className="mb-3">
					<Card className="text-center h-100">
						<Card.Body>
							<FaEnvelope className="text-primary fs-2 mb-2" />
							<h4 className="mb-1">{stats.totalContacts || 0}</h4>
							<small className="text-muted">Total Contacts</small>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={3} md={6} className="mb-3">
					<Card className="text-center h-100">
						<Card.Body>
							<FaClock className="text-warning fs-2 mb-2" />
							<h4 className="mb-1">{stats.pendingContacts || 0}</h4>
							<small className="text-muted">Pending</small>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={3} md={6} className="mb-3">
					<Card className="text-center h-100">
						<Card.Body>
							<FaBuilding className="text-info fs-2 mb-2" />
							<h4 className="mb-1">{stats.corporateEnquiries || 0}</h4>
							<small className="text-muted">Corporate</small>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={3} md={6} className="mb-3">
					<Card className="text-center h-100">
						<Card.Body>
							<FaPhone className="text-success fs-2 mb-2" />
							<h4 className="mb-1">{stats.recentContacts || 0}</h4>
							<small className="text-muted">This Week</small>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Filters and Search */}
			<Card className="mb-4">
				<Card.Body>
					<Row>
						<Col lg={4} md={6} className="mb-3">
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search contacts..."
									value={filters.search}
									onChange={(e) => handleFilterChange("search", e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col lg={2} md={6} className="mb-3">
							<Form.Select
								value={filters.status}
								onChange={(e) => handleFilterChange("status", e.target.value)}
							>
								<option value="">All Status</option>
								<option value="pending">Pending</option>
								<option value="reviewed">Reviewed</option>
								<option value="responded">Responded</option>
								<option value="closed">Closed</option>
							</Form.Select>
						</Col>
						<Col lg={2} md={6} className="mb-3">
							<Form.Select
								value={filters.enquiryType}
								onChange={(e) =>
									handleFilterChange("enquiryType", e.target.value)
								}
							>
								<option value="">All Types</option>
								<option value="course">Course</option>
								<option value="corporate">Corporate</option>
							</Form.Select>
						</Col>
						<Col lg={2} md={6} className="mb-3">
							<Form.Select
								value={filters.priority}
								onChange={(e) => handleFilterChange("priority", e.target.value)}
							>
								<option value="">All Priority</option>
								<option value="urgent">Urgent</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</Form.Select>
						</Col>
						<Col lg={2} md={6} className="mb-3">
							<Button
								variant="outline-secondary"
								onClick={() =>
									setFilters({
										search: "",
										status: "",
										enquiryType: "",
										priority: "",
									})
								}
								className="w-100"
							>
								Clear Filters
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			{/* Error Alert */}
			{error && (
				<Alert variant="danger" dismissible onClose={() => setError("")}>
					{error}
				</Alert>
			)}

			{/* Contacts Table */}
			<Card>
				<Card.Header className="d-flex justify-content-between align-items-center">
					<h6 className="mb-0">Contacts ({totalItems})</h6>
				</Card.Header>
				<Card.Body className="p-0">
					{loading ? (
						<div className="text-center p-5">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : contacts.length === 0 ? (
						<div className="text-center p-5">
							<p className="text-muted">No contacts found</p>
						</div>
					) : (
						<Table responsive hover className="mb-0">
							<thead className="table-light">
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Type</th>
									<th>Status</th>
									<th>Priority</th>
									<th>Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((contact) => (
									<tr key={contact.id}>
										<td>
											<div>
												<strong>{contact.fullName}</strong>
												{contact.organisationName && (
													<div className="text-muted small">
														{contact.organisationName}
													</div>
												)}
											</div>
										</td>
										<td>
											<div className="text-break">{contact.email}</div>
											<div className="text-muted small">{contact.phone}</div>
										</td>
										<td>
											<Badge
												bg={
													contact.enquiryType === "corporate"
														? "info"
														: "primary"
												}
												className="text-capitalize"
											>
												{contact.enquiryType}
											</Badge>
										</td>
										<td>
											<Badge
												bg={getStatusVariant(contact.status)}
												className="text-capitalize"
											>
												{contact.status}
											</Badge>
										</td>
										<td>
											<Badge
												bg={getPriorityVariant(contact.priority)}
												className="text-capitalize"
											>
												{contact.priority}
											</Badge>
										</td>
										<td className="text-nowrap">
											{new Date(contact.createdAt).toLocaleDateString()}
											<div className="text-muted small">
												{new Date(contact.createdAt).toLocaleTimeString()}
											</div>
										</td>
										<td>
											<div className="d-flex gap-2">
												<Button
													size="sm"
													variant="outline-primary"
													onClick={() => viewContact(contact)}
												>
													<FaEye />
												</Button>
												<Button
													size="sm"
													variant="outline-danger"
													onClick={() => deleteContact(contact.id)}
												>
													<FaTrash />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Card.Body>

				{/* Pagination */}
				{totalPages > 1 && (
					<Card.Footer>
						<div className="d-flex justify-content-between align-items-center">
							<small className="text-muted">
								Showing {(currentPage - 1) * 10 + 1} to{" "}
								{Math.min(currentPage * 10, totalItems)} of {totalItems} entries
							</small>
							<Pagination className="mb-0">
								<Pagination.Prev
									disabled={currentPage === 1}
									onClick={() => setCurrentPage(currentPage - 1)}
								/>
								{[...Array(totalPages)].map((_, index) => (
									<Pagination.Item
										key={index + 1}
										active={index + 1 === currentPage}
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</Pagination.Item>
								))}
								<Pagination.Next
									disabled={currentPage === totalPages}
									onClick={() => setCurrentPage(currentPage + 1)}
								/>
							</Pagination>
						</div>
					</Card.Footer>
				)}
			</Card>

			{/* Contact Details Modal */}
			<Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Contact Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedContact && (
						<div>
							<Row className="mb-3">
								<Col md={6}>
									<strong>Name:</strong> {selectedContact.fullName}
								</Col>
								<Col md={6}>
									<strong>Email:</strong> {selectedContact.email}
								</Col>
							</Row>
							<Row className="mb-3">
								<Col md={6}>
									<strong>Phone:</strong> {selectedContact.phone}
								</Col>
								<Col md={6}>
									<strong>Type:</strong>
									<Badge
										bg={
											selectedContact.enquiryType === "corporate"
												? "info"
												: "primary"
										}
										className="ms-2"
									>
										{selectedContact.enquiryType}
									</Badge>
								</Col>
							</Row>
							{selectedContact.organisationName && (
								<Row className="mb-3">
									<Col>
										<strong>Organisation:</strong>{" "}
										{selectedContact.organisationName}
									</Col>
								</Row>
							)}
							<Row className="mb-3">
								<Col md={6}>
									<strong>Status:</strong>
									<Badge
										bg={getStatusVariant(selectedContact.status)}
										className="ms-2"
									>
										{selectedContact.status}
									</Badge>
								</Col>
								<Col md={6}>
									<strong>Priority:</strong>
									<Badge
										bg={getPriorityVariant(selectedContact.priority)}
										className="ms-2"
									>
										{selectedContact.priority}
									</Badge>
								</Col>
							</Row>
							<Row className="mb-3">
								<Col>
									<strong>Message:</strong>
									<div className="border p-3 mt-2 bg-light">
										{selectedContact.message}
									</div>
								</Col>
							</Row>
							<Row className="mb-3">
								<Col md={6}>
									<strong>Submitted:</strong>{" "}
									{new Date(selectedContact.createdAt).toLocaleString()}
								</Col>
								{selectedContact.responseDate && (
									<Col md={6}>
										<strong>Responded:</strong>{" "}
										{new Date(selectedContact.responseDate).toLocaleString()}
									</Col>
								)}
							</Row>

							{/* Admin Actions */}
							<hr />
							<h6>Admin Actions</h6>
							<Row>
								<Col md={6} className="mb-3">
									<Form.Label>Status</Form.Label>
									<Form.Select
										value={selectedContact.status}
										onChange={(e) =>
											setSelectedContact({
												...selectedContact,
												status: e.target.value,
											})
										}
									>
										<option value="pending">Pending</option>
										<option value="reviewed">Reviewed</option>
										<option value="responded">Responded</option>
										<option value="closed">Closed</option>
									</Form.Select>
								</Col>
								<Col md={6} className="mb-3">
									<Form.Label>Priority</Form.Label>
									<Form.Select
										value={selectedContact.priority}
										onChange={(e) =>
											setSelectedContact({
												...selectedContact,
												priority: e.target.value,
											})
										}
									>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
										<option value="urgent">Urgent</option>
									</Form.Select>
								</Col>
							</Row>
							<Row>
								<Col className="mb-3">
									<Form.Label>Admin Notes</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										value={selectedContact.adminNotes || ""}
										onChange={(e) =>
											setSelectedContact({
												...selectedContact,
												adminNotes: e.target.value,
											})
										}
										placeholder="Add internal notes..."
									/>
								</Col>
							</Row>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
					<Button
						variant="primary"
						onClick={() =>
							updateContact(selectedContact.id, {
								status: selectedContact.status,
								priority: selectedContact.priority,
								adminNotes: selectedContact.adminNotes,
								respondedBy: 1, // This should come from authenticated user
							})
						}
						disabled={isUpdating}
					>
						{isUpdating ? (
							<Spinner animation="border" size="sm" />
						) : (
							"Update Contact"
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ContactManagement;
