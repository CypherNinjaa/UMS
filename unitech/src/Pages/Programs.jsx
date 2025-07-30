import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Form,
	InputGroup,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	FaGraduationCap,
	FaSearch,
	FaClock,
	FaUsers,
	FaStar,
	FaBookOpen,
	FaRupeeSign,
	FaCalendarAlt,
} from "react-icons/fa";
import { usePrograms } from "../hooks/usePrograms";
import "./Pages.css";

const Programs = () => {
	// Get programs context
	const { programs, departments, loading, error, actions } = usePrograms();

	// Local state for filters
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");
	const [selectedType, setSelectedType] = useState("All");
	const selectedStatus = "Active"; // Default to Active programs only

	// Fetch programs and departments on component mount
	useEffect(() => {
		actions.fetchPrograms({ status: "Active" });
		actions.fetchDepartments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Remove actions dependency to prevent infinite loop

	// Update filters when local state changes
	useEffect(() => {
		const filters = {
			search: searchTerm,
			department: selectedDepartment,
			type: selectedType,
			status: selectedStatus,
			featured: "All",
		};

		// Fetch programs with new filters
		actions.fetchPrograms(filters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm, selectedDepartment, selectedType, selectedStatus]); // Remove actions dependency

	// Get unique program types from the programs
	const programTypes = [
		"All",
		...new Set(programs.map((program) => program.type)),
	];

	// Filter programs for display (additional client-side filtering if needed)
	const filteredPrograms = programs.filter((program) => {
		// Only show active programs for public view
		return program.status === "Active";
	});

	// Get category color for badges based on type
	const getTypeColor = (type) => {
		const colors = {
			Undergraduate: "primary",
			Graduate: "success",
			Certificate: "warning",
			Diploma: "info",
			Doctorate: "secondary",
		};
		return colors[type] || "secondary";
	};

	// Format currency
	const formatCurrency = (amount) => {
		if (!amount) return "Contact for pricing";
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
		}).format(amount);
	};

	// Format date
	const formatDate = (date) => {
		if (!date) return "N/A";
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="programs-page">
			{/* Page Header */}
			<section className="page-header bg-primary text-white py-5">
				<Container>
					<Row className="text-center">
						<Col>
							<h1 className="display-4 fw-bold my-5">
								<FaGraduationCap className="me-3" />
								Academic Programs
							</h1>
							<p className="lead">
								Discover world-class education opportunities designed to shape
								your future
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Search and Filters */}
			<section className="py-4 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col md={6}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search programs..."
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
										{department}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={3}>
							<Form.Select
								value={selectedType}
								onChange={(e) => setSelectedType(e.target.value)}
							>
								{programTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</Form.Select>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Loading State */}
			{loading && (
				<section className="py-5">
					<Container>
						<Row>
							<Col className="text-center">
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<p className="mt-3">Loading programs...</p>
							</Col>
						</Row>
					</Container>
				</section>
			)}

			{/* Error State */}
			{error && (
				<section className="py-3">
					<Container>
						<Alert
							variant="danger"
							dismissible
							onClose={() => actions.clearError()}
						>
							{error}
						</Alert>
					</Container>
				</section>
			)}

			{/* Programs Grid */}
			{!loading && (
				<section className="py-5">
					<Container>
						<Row>
							{filteredPrograms.map((program) => (
								<Col lg={4} md={6} className="mb-4" key={program.id}>
									<Card className="program-card h-100 shadow-sm position-relative">
										{program.featured && (
											<div
												className="position-absolute top-0 end-4 m-0"
												style={{ zIndex: 10 }}
											>
												<Badge bg="warning" className="featured-text">
													<FaStar className="me-1" />
													Featured
												</Badge>
											</div>
										)}

										<Card.Body className="d-flex flex-column">
											<div className="program-header mb-3">
												<div className="d-flex justify-content-between align-items-start mb-2">
													<h5 className="program-title">{program.name}</h5>
													<Badge bg={getTypeColor(program.type)}>
														{program.type}
													</Badge>
												</div>
												<div className="d-flex align-items-center text-muted mb-2">
													<FaGraduationCap className="me-2" />
													<span>{program.department}</span>
													<FaClock className="ms-3 me-2" />
													<span>{program.duration}</span>
												</div>
											</div>

											<p className="program-description">
												{program.description}
											</p>

											{/* Program Details */}
											<div className="program-details mb-3">
												<Row className="text-sm">
													<Col xs={6} className="mb-2">
														<FaBookOpen className="text-primary me-2" />
														<strong>Credits:</strong> {program.credits}
													</Col>
													<Col xs={6} className="mb-2">
														<FaUsers className="text-success me-2" />
														<strong>Capacity:</strong> {program.capacity}
													</Col>
													<Col xs={6} className="mb-2">
														<FaRupeeSign className="text-warning me-2" />
														<strong>Tuition:</strong>{" "}
														{formatCurrency(program.tuitionFee)}
													</Col>
													<Col xs={6} className="mb-2">
														<FaCalendarAlt className="text-info me-2" />
														<strong>Starts:</strong>{" "}
														{formatDate(program.startDate)}
													</Col>
												</Row>
											</div>

											{/* Program Features/Requirements */}
											{program.requirements && (
												<div className="program-features mb-3">
													<h6 className="mb-2">Requirements:</h6>
													<p className="text-muted small">
														{program.requirements}
													</p>
												</div>
											)}

											{/* Program Stats */}
											{program.rating > 0 && (
												<div className="program-stats mb-3">
													<Row className="text-center">
														<Col>
															<div className="stat">
																<FaStar className="text-warning" />
																<div className="stat-value">
																	{program.rating}
																</div>
																<div className="stat-label">Rating</div>
															</div>
														</Col>
													</Row>
												</div>
											)}

											<div className="mt-auto">
												<Button variant="primary" className="w-100">
													<FaBookOpen className="me-2" />
													Learn More
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>

						{filteredPrograms.length === 0 && !loading && (
							<Row>
								<Col className="text-center py-5">
									<h4>No programs found</h4>
									<p className="text-muted">
										Try adjusting your search criteria
									</p>
								</Col>
							</Row>
						)}
					</Container>
				</section>
			)}
		</div>
	);
};

export default Programs;
