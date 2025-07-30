import React, { useState } from "react";
import "../../Pages/NewsEventsManagement.css";
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
	Alert,
	Spinner,
	Toast,
	ToastContainer,
} from "react-bootstrap";
import {
	FaPlus,
	FaSearch,
	FaEdit,
	FaTrash,
	FaEye,
	FaFilter,
	FaNewspaper,
	FaCalendarAlt,
	FaUser,
	FaClock,
	FaMapMarkerAlt,
	FaFileAlt,
	FaStar,
	FaToggleOn,
	FaToggleOff,
} from "react-icons/fa";
import { useNewsEvent } from "../../contexts/useNewsEvent";
import NewsEventForm from "./Forms/NewsEventForm";

const NewsEventsManagementContent = () => {
	const {
		newsEvents,
		loading,
		error,
		filters,
		pagination,
		statistics,
		updateFilters,
		clearFilters,
		changePage,
		createNewsEvent,
		updateNewsEvent,
		deleteNewsEvent,
		updateNewsEventStatus,
		toggleFeatured,
	} = useNewsEvent();

	const [showForm, setShowForm] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [editingItem, setEditingItem] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");
	const [toast, setToast] = useState({
		show: false,
		message: "",
		variant: "success",
	});

	// Get unique values for filters
	const types = ["All", "News", "Event", "Announcement"];
	const categories = [
		"All",
		...new Set(newsEvents.map((item) => item.category).filter(Boolean)),
	];
	const statuses = ["All", "Published", "Draft", "Archived", "Scheduled"];

	const showToast = (message, variant = "success") => {
		setToast({ show: true, message, variant });
		setTimeout(
			() => setToast({ show: false, message: "", variant: "success" }),
			3000
		);
	};

	const handleSearch = (searchTerm) => {
		updateFilters({ search: searchTerm });
	};

	const handleFilterChange = (filterName, value) => {
		updateFilters({ [filterName]: value });
	};

	const handleAdd = () => {
		setEditingItem(null);
		setShowForm(true);
	};

	const handleEdit = (item) => {
		setEditingItem(item);
		setShowForm(true);
	};

	const handleDelete = (item) => {
		setSelectedItem(item);
		setShowDeleteModal(true);
	};

	const handleViewDetails = (item) => {
		setSelectedItem(item);
		setShowDetailsModal(true);
	};

	const handleFormSubmit = async (formData) => {
		try {
			let result;
			if (editingItem) {
				result = await updateNewsEvent(editingItem.id, formData);
			} else {
				result = await createNewsEvent(formData);
			}

			if (result.success) {
				setShowForm(false);
				setEditingItem(null);
				showToast(
					`${formData.type} ${
						editingItem ? "updated" : "created"
					} successfully!`,
					"success"
				);
			} else {
				showToast(result.error || "Operation failed", "danger");
			}
		} catch {
			showToast("An unexpected error occurred", "danger");
		}
	};

	const confirmDelete = async () => {
		try {
			const result = await deleteNewsEvent(selectedItem.id);
			if (result.success) {
				setShowDeleteModal(false);
				setSelectedItem(null);
				showToast("Item deleted successfully!", "success");
			} else {
				showToast(result.error || "Delete failed", "danger");
			}
		} catch {
			showToast("An unexpected error occurred", "danger");
		}
	};

	const handleStatusChange = async (item, newStatus) => {
		try {
			const result = await updateNewsEventStatus(item.id, newStatus);
			if (result.success) {
				showToast(`Status updated to ${newStatus}`, "success");
			} else {
				showToast(result.error || "Status update failed", "danger");
			}
		} catch {
			showToast("An unexpected error occurred", "danger");
		}
	};

	const handleToggleFeatured = async (item) => {
		try {
			const result = await toggleFeatured(item.id);
			if (result.success) {
				showToast(
					`Item ${
						result.data.featured ? "featured" : "unfeatured"
					} successfully!`,
					"success"
				);
			} else {
				showToast(result.error || "Operation failed", "danger");
			}
		} catch {
			showToast("An unexpected error occurred", "danger");
		}
	};

	const getStatusBadge = (status) => {
		const variants = {
			Published: "success",
			Draft: "warning",
			Archived: "secondary",
			Scheduled: "info",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	const getTypeBadge = (type) => {
		const variants = {
			News: "primary",
			Event: "info",
			Announcement: "warning",
		};
		return <Badge bg={variants[type] || "secondary"}>{type}</Badge>;
	};

	const formatDate = (dateString) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString();
	};

	const formatDateTime = (date, time) => {
		if (!date) return "N/A";
		const formattedDate = formatDate(date);
		return time ? `${formattedDate} at ${time}` : formattedDate;
	};

	if (error) {
		return (
			<div className="news-events-management">
				<Alert variant="danger" className="m-4">
					<h5>Error Loading Data</h5>
					<p>{error}</p>
					<Button
						variant="outline-danger"
						onClick={() => window.location.reload()}
					>
						Reload Page
					</Button>
				</Alert>
			</div>
		);
	}

	return (
		<div className="news-events-management">
			{/* Toast Notifications */}
			<ToastContainer position="top-end" className="p-3">
				<Toast show={toast.show} bg={toast.variant}>
					<Toast.Body className="text-white">{toast.message}</Toast.Body>
				</Toast>
			</ToastContainer>

			{/* Page Header */}
			<div className="page-header mb-4">
				<Row className="align-items-center">
					<Col>
						<h2 className="page-title">News & Events Management</h2>
						<p className="page-subtitle text-muted">
							Manage university news, events, and announcements
						</p>
					</Col>
					<Col xs="auto">
						<Button variant="primary" onClick={handleAdd}>
							<FaPlus className="me-2" />
							Add News/Event
						</Button>
					</Col>
				</Row>
			</div>

			{/* Statistics Cards */}
			<Row className="mb-4">
				<Col md={3}>
					<Card className="stats-card">
						<Card.Body className="text-center">
							<FaNewspaper className="stats-icon text-primary mb-2" size={24} />
							<h3 className="mb-0">{statistics.totalItems}</h3>
							<p className="text-muted mb-0">Total Items</p>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="stats-card">
						<Card.Body className="text-center">
							<FaFileAlt className="stats-icon text-success mb-2" size={24} />
							<h3 className="mb-0">{statistics.publishedItems}</h3>
							<p className="text-muted mb-0">Published</p>
						</Card.Body>
					</Card>
				</Col>
				<Col md={3}>
					<Card className="stats-card">
						<Card.Body className="text-center">
							<FaCalendarAlt className="stats-icon text-info mb-2" size={24} />
							<h3 className="mb-0">{statistics.upcomingEvents}</h3>
							<p className="text-muted mb-0">Upcoming Events</p>
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
									placeholder="Search by title, description, or author..."
									value={filters.search}
									onChange={(e) => handleSearch(e.target.value)}
								/>
							</InputGroup>
						</Col>
						<Col md={2}>
							<Form.Select
								value={filters.type}
								onChange={(e) => handleFilterChange("type", e.target.value)}
							>
								{types.map((type) => (
									<option key={type} value={type}>
										{type === "All" ? "All Types" : type}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={2}>
							<Form.Select
								value={filters.category}
								onChange={(e) => handleFilterChange("category", e.target.value)}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category === "All" ? "All Categories" : category}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={2}>
							<Form.Select
								value={filters.status}
								onChange={(e) => handleFilterChange("status", e.target.value)}
							>
								{statuses.map((status) => (
									<option key={status} value={status}>
										{status === "All" ? "All Status" : status}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={2} className="text-end">
							<Button
								variant="outline-secondary"
								size="sm"
								className="me-2"
								onClick={clearFilters}
							>
								Clear Filters
							</Button>
							<div className="text-muted small">
								{pagination.totalItems} total items
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			{/* News & Events Table */}
			<Card>
				<Card.Body className="p-0">
					{loading ? (
						<div className="text-center py-5">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
							<p className="mt-2 text-muted">Loading news and events...</p>
						</div>
					) : (
						<>
							<Table responsive hover className="mb-0">
								<thead className="bg-light">
									<tr>
										<th>Title & Type</th>
										<th>Category</th>
										<th>Author</th>
										<th>Date/Event Info</th>
										<th>Engagement</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{newsEvents.map((item) => (
										<tr key={item.id}>
											<td>
												<div>
													<div className="fw-semibold d-flex align-items-center">
														{item.title}
														{item.featured && (
															<Badge bg="warning" size="sm" className="ms-2">
																<FaStar className="me-1" />
																Featured
															</Badge>
														)}
													</div>
													<div className="mt-1">{getTypeBadge(item.type)}</div>
													<div className="text-muted small mt-1">
														{item.description?.substring(0, 100)}...
													</div>
												</div>
											</td>
											<td>
												<Badge bg="secondary">{item.category}</Badge>
											</td>
											<td>
												<div>
													<FaUser className="me-1" />
													{item.author}
												</div>
											</td>
											<td>
												<div>
													<div className="small">
														<FaCalendarAlt className="me-1" />
														Published: {formatDate(item.publishDate)}
													</div>
													{item.type === "Event" && item.eventDate && (
														<div className="small text-primary">
															<FaClock className="me-1" />
															Event:{" "}
															{formatDateTime(item.eventDate, item.eventTime)}
														</div>
													)}
													{item.location && (
														<div className="small text-muted">
															<FaMapMarkerAlt className="me-1" />
															{item.location}
														</div>
													)}
												</div>
											</td>
											<td>
												<div>
													{item.type === "Event" && item.registrations > 0 && (
														<div className="small text-success">
															{item.registrations} registrations
														</div>
													)}
													{item.type !== "Event" && (
														<div className="small text-muted">-</div>
													)}
												</div>
											</td>
											<td>{getStatusBadge(item.status)}</td>
											<td>
												<Dropdown>
													<Dropdown.Toggle
														variant="outline-secondary"
														size="sm"
														id={`dropdown-${item.id}`}
													>
														Actions
													</Dropdown.Toggle>
													<Dropdown.Menu>
														<Dropdown.Item
															onClick={() => handleViewDetails(item)}
														>
															<FaEye className="me-2" />
															View Details
														</Dropdown.Item>
														<Dropdown.Item onClick={() => handleEdit(item)}>
															<FaEdit className="me-2" />
															Edit
														</Dropdown.Item>
														<Dropdown.Item
															onClick={() => handleToggleFeatured(item)}
														>
															{item.featured ? (
																<FaToggleOff className="me-2" />
															) : (
																<FaToggleOn className="me-2" />
															)}
															{item.featured ? "Unfeature" : "Feature"}
														</Dropdown.Item>
														{item.type === "Event" && (
															<Dropdown.Item>
																<FaCalendarAlt className="me-2" />
																Manage Registrations
															</Dropdown.Item>
														)}
														<Dropdown.Divider />
														<Dropdown.ItemText>
															Change Status:
														</Dropdown.ItemText>
														{["Published", "Draft", "Archived"].map(
															(status) => (
																<Dropdown.Item
																	key={status}
																	onClick={() =>
																		handleStatusChange(item, status)
																	}
																	disabled={item.status === status}
																>
																	{status}
																</Dropdown.Item>
															)
														)}
														<Dropdown.Divider />
														<Dropdown.Item
															className="text-danger"
															onClick={() => handleDelete(item)}
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

							{newsEvents.length === 0 && (
								<div className="text-center py-5">
									<h5>No news or events found</h5>
									<p className="text-muted">
										Try adjusting your search criteria or add a new item.
									</p>
									<Button variant="primary" onClick={handleAdd}>
										<FaPlus className="me-2" />
										Add First News/Event
									</Button>
								</div>
							)}
						</>
					)}
				</Card.Body>

				{/* Pagination */}
				{pagination.totalPages > 1 && (
					<Card.Footer>
						<Row className="align-items-center">
							<Col>
								<small className="text-muted">
									Showing{" "}
									{(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
									to{" "}
									{Math.min(
										pagination.currentPage * pagination.itemsPerPage,
										pagination.totalItems
									)}{" "}
									of {pagination.totalItems} entries
								</small>
							</Col>
							<Col xs="auto">
								<Button
									variant="outline-primary"
									size="sm"
									disabled={!pagination.hasPrevPage}
									onClick={() => changePage(pagination.currentPage - 1)}
								>
									Previous
								</Button>
								<span className="mx-2">
									Page {pagination.currentPage} of {pagination.totalPages}
								</span>
								<Button
									variant="outline-primary"
									size="sm"
									disabled={!pagination.hasNextPage}
									onClick={() => changePage(pagination.currentPage + 1)}
								>
									Next
								</Button>
							</Col>
						</Row>
					</Card.Footer>
				)}
			</Card>

			{/* Add/Edit Form Modal */}
			<NewsEventForm
				show={showForm}
				onHide={() => {
					setShowForm(false);
					setEditingItem(null);
				}}
				onSubmit={handleFormSubmit}
				editData={editingItem}
				loading={loading}
			/>

			{/* Details Modal */}
			<Modal
				size="lg"
				show={showDetailsModal}
				onHide={() => setShowDetailsModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>{selectedItem?.type} Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedItem && (
						<Tabs
							activeKey={activeTab}
							onSelect={(k) => setActiveTab(k)}
							className="mb-3"
						>
							<Tab eventKey="overview" title="Overview">
								<Row>
									<Col md={8}>
										<h5 className="d-flex align-items-center">
											{selectedItem.title}
											{selectedItem.featured && (
												<Badge bg="warning" className="ms-2">
													<FaStar className="me-1" />
													Featured
												</Badge>
											)}
										</h5>
										<div className="mb-3">
											{getTypeBadge(selectedItem.type)}
											<Badge bg="secondary" className="ms-2">
												{selectedItem.category}
											</Badge>
											{getStatusBadge(selectedItem.status)}
										</div>
										<p>{selectedItem.content}</p>
									</Col>
									<Col md={4}>
										<Card className="bg-light">
											<Card.Body>
												<h6>Information</h6>
												<div className="mb-2">
													<strong>Author:</strong> {selectedItem.author}
												</div>
												<div className="mb-2">
													<strong>Published:</strong>{" "}
													{formatDate(selectedItem.publishDate)}
												</div>
												{selectedItem.type === "Event" && (
													<>
														{selectedItem.eventDate && (
															<div className="mb-2">
																<strong>Event Date:</strong>{" "}
																{formatDateTime(
																	selectedItem.eventDate,
																	selectedItem.eventTime
																)}
															</div>
														)}
														{selectedItem.location && (
															<div className="mb-2">
																<strong>Location:</strong>{" "}
																{selectedItem.location}
															</div>
														)}
													</>
												)}
												{selectedItem.type === "Event" &&
													selectedItem.registrations > 0 && (
														<div className="mb-2">
															<strong>Registrations:</strong>{" "}
															{selectedItem.registrations}
														</div>
													)}
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</Tab>
							<Tab eventKey="engagement" title="Engagement">
								<Row>
									<Col md={6}>
										{selectedItem.type === "Event" && (
											<>
												<h6>Event Statistics</h6>
												<p>
													Registrations:{" "}
													<strong>{selectedItem.registrations || 0}</strong>
												</p>
											</>
										)}
										{selectedItem.type !== "Event" && (
											<p className="text-muted">
												No engagement data available for this content type.
											</p>
										)}
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
					<Button variant="primary" onClick={() => handleEdit(selectedItem)}>
						<FaEdit className="me-2" />
						Edit
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedItem && (
						<>
							<p>Are you sure you want to delete "{selectedItem.title}"?</p>
							{selectedItem.type === "Event" &&
								selectedItem.registrations > 0 && (
									<div className="alert alert-warning">
										<strong>Warning:</strong> This event has{" "}
										{selectedItem.registrations} registrations.
									</div>
								)}
							<p className="text-muted small">
								This action cannot be undone. All associated data will be
								permanently removed.
							</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default NewsEventsManagementContent;
