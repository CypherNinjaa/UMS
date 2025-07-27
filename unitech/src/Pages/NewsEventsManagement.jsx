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
	FaNewspaper,
	FaCalendarAlt,
	FaUser,
	FaClock,
	FaMapMarkerAlt,
	FaImage,
	FaFileAlt,
	FaStar,
} from "react-icons/fa";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";

const NewsEventsManagement = () => {
	// Sample news and events data
	const [newsEvents, setNewsEvents] = useState([
		{
			id: 1,
			title: "Annual Convocation Ceremony 2024",
			type: "Event",
			category: "Academic",
			description:
				"Join us for the annual convocation ceremony celebrating our graduating class of 2024.",
			content:
				"We are pleased to announce our Annual Convocation Ceremony for the graduating class of 2024. The ceremony will be held at the University Auditorium with distinguished guests and faculty members present to honor our graduates.",
			author: "Dr. Sarah Johnson",
			publishDate: "2024-12-15",
			eventDate: "2024-12-20",
			eventTime: "10:00 AM",
			location: "University Auditorium",
			status: "Published",
			featured: true,
			image: null,
			views: 1250,
			registrations: 89,
		},
		{
			id: 2,
			title: "New Research Lab Opening",
			type: "News",
			category: "Research",
			description:
				"State-of-the-art AI and Machine Learning research laboratory now open for students and faculty.",
			content:
				"The university is proud to announce the opening of our new Artificial Intelligence and Machine Learning research laboratory. This cutting-edge facility will provide students and faculty with advanced computing resources and collaborative spaces for innovative research.",
			author: "Dr. Michael Chen",
			publishDate: "2024-11-28",
			eventDate: null,
			eventTime: null,
			location: null,
			status: "Published",
			featured: false,
			image: null,
			views: 890,
			registrations: 0,
		},
		{
			id: 3,
			title: "Student Tech Conference 2025",
			type: "Event",
			category: "Technology",
			description:
				"Annual student-led technology conference featuring presentations, workshops, and networking.",
			content:
				"The Student Tech Conference is an annual event organized by our Computer Science students. This year's theme focuses on emerging technologies, sustainability, and innovation. Students will present their projects and industry professionals will lead workshops.",
			author: "Prof. Emily Rodriguez",
			publishDate: "2024-10-15",
			eventDate: "2025-03-15",
			eventTime: "9:00 AM",
			location: "Engineering Building, Halls A & B",
			status: "Published",
			featured: true,
			image: null,
			views: 2100,
			registrations: 156,
		},
		{
			id: 4,
			title: "Faculty Excellence Awards",
			type: "News",
			category: "Awards",
			description:
				"Recognizing outstanding faculty contributions to education, research, and community service.",
			content:
				"The university is pleased to announce the recipients of this year's Faculty Excellence Awards. These awards recognize outstanding contributions in teaching, research, and community service by our dedicated faculty members.",
			author: "Dr. James Wilson",
			publishDate: "2024-09-22",
			eventDate: null,
			eventTime: null,
			location: null,
			status: "Published",
			featured: false,
			image: null,
			views: 567,
			registrations: 0,
		},
		{
			id: 5,
			title: "International Exchange Program Applications Open",
			type: "News",
			category: "International",
			description:
				"Applications now open for spring semester exchange programs with partner universities.",
			content:
				"Students interested in international experience can now apply for our spring semester exchange programs. We have partnerships with over 20 universities worldwide, offering diverse academic and cultural experiences.",
			author: "Dr. Lisa Zhang",
			publishDate: "2024-08-30",
			eventDate: null,
			eventTime: null,
			location: null,
			status: "Published",
			featured: false,
			image: null,
			views: 445,
			registrations: 0,
		},
		{
			id: 6,
			title: "Campus Sustainability Workshop",
			type: "Event",
			category: "Environment",
			description:
				"Interactive workshop on campus sustainability initiatives and student involvement opportunities.",
			content:
				"Join us for an interactive workshop focused on campus sustainability initiatives. Learn about current projects, future plans, and how students can get involved in making our campus more environmentally friendly.",
			author: "Dr. Robert Taylor",
			publishDate: "2024-11-01",
			eventDate: "2024-12-05",
			eventTime: "2:00 PM",
			location: "Student Union Building, Room 201",
			status: "Draft",
			featured: false,
			image: null,
			views: 78,
			registrations: 23,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("All");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");

	// Get unique values for filters
	const types = ["All", ...new Set(newsEvents.map((item) => item.type))];
	const categories = [
		"All",
		...new Set(newsEvents.map((item) => item.category)),
	];
	const statuses = ["All", ...new Set(newsEvents.map((item) => item.status))];

	// Filter news and events
	const filteredItems = newsEvents.filter((item) => {
		const matchesSearch =
			item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.author.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = selectedType === "All" || item.type === selectedType;
		const matchesCategory =
			selectedCategory === "All" || item.category === selectedCategory;
		const matchesStatus =
			selectedStatus === "All" || item.status === selectedStatus;

		return matchesSearch && matchesType && matchesCategory && matchesStatus;
	});

	const handleDelete = (item) => {
		setSelectedItem(item);
		setShowDeleteModal(true);
	};

	const handleViewDetails = (item) => {
		setSelectedItem(item);
		setShowDetailsModal(true);
	};

	const confirmDelete = () => {
		setNewsEvents(newsEvents.filter((item) => item.id !== selectedItem.id));
		setShowDeleteModal(false);
		setSelectedItem(null);
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
		return new Date(dateString).toLocaleDateString();
	};

	const formatDateTime = (date, time) => {
		if (!date) return "N/A";
		const formattedDate = formatDate(date);
		return time ? `${formattedDate} at ${time}` : formattedDate;
	};

	// Calculate statistics
	const totalItems = newsEvents.length;
	const publishedItems = newsEvents.filter(
		(item) => item.status === "Published"
	).length;
	const upcomingEvents = newsEvents.filter(
		(item) =>
			item.type === "Event" &&
			item.eventDate &&
			new Date(item.eventDate) > new Date()
	).length;
	const totalViews = newsEvents.reduce((sum, item) => sum + item.views, 0);

	return (
		<AdminLayout>
			<div className="news-events-management">
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
							<Button variant="primary" className="me-2">
								<FaPlus className="me-2" />
								Add News/Event
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
								<FaNewspaper
									className="stats-icon text-primary mb-2"
									size={24}
								/>
								<h3 className="mb-0">{totalItems}</h3>
								<p className="text-muted mb-0">Total Items</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaFileAlt className="stats-icon text-success mb-2" size={24} />
								<h3 className="mb-0">{publishedItems}</h3>
								<p className="text-muted mb-0">Published</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaCalendarAlt
									className="stats-icon text-info mb-2"
									size={24}
								/>
								<h3 className="mb-0">{upcomingEvents}</h3>
								<p className="text-muted mb-0">Upcoming Events</p>
							</Card.Body>
						</Card>
					</Col>
					<Col md={3}>
						<Card className="stats-card">
							<Card.Body className="text-center">
								<FaEye className="stats-icon text-warning mb-2" size={24} />
								<h3 className="mb-0">{totalViews.toLocaleString()}</h3>
								<p className="text-muted mb-0">Total Views</p>
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
									{types.map((type) => (
										<option key={type} value={type}>
											{type === "All" ? "All Types" : type}
										</option>
									))}
								</Form.Select>
							</Col>
							<Col md={2}>
								<Form.Select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
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
									{filteredItems.length} of {newsEvents.length} items
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				{/* News & Events Table */}
				<Card>
					<Card.Body className="p-0">
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
								{filteredItems.map((item) => (
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
													{item.description.substring(0, 100)}...
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
												<div className="small">
													<FaEye className="me-1" />
													{item.views} views
												</div>
												{item.type === "Event" && item.registrations > 0 && (
													<div className="small text-success">
														{item.registrations} registrations
													</div>
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
													<Dropdown.Item>
														<FaEdit className="me-2" />
														Edit
													</Dropdown.Item>
													{item.type === "Event" && (
														<Dropdown.Item>
															<FaCalendarAlt className="me-2" />
															Manage Registrations
														</Dropdown.Item>
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

						{filteredItems.length === 0 && (
							<div className="text-center py-5">
								<h5>No news or events found</h5>
								<p className="text-muted">
									Try adjusting your search criteria or add a new item.
								</p>
								<Button variant="primary">
									<FaPlus className="me-2" />
									Add First News/Event
								</Button>
							</div>
						)}
					</Card.Body>
				</Card>

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
													<div className="mb-2">
														<strong>Views:</strong> {selectedItem.views}
													</div>
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
											<h6>View Statistics</h6>
											<p>
												Total Views: <strong>{selectedItem.views}</strong>
											</p>
											{selectedItem.type === "Event" && (
												<>
													<h6>Event Statistics</h6>
													<p>
														Registrations:{" "}
														<strong>{selectedItem.registrations}</strong>
													</p>
												</>
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
						<Button variant="primary">
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
			</div>
		</AdminLayout>
	);
};

export default NewsEventsManagement;
