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
	FaSearch,
	FaEnvelope,
	FaPhone,
	FaGraduationCap,
	FaBook,
	FaAward,
	FaLinkedin,
	FaUserGraduate,
} from "react-icons/fa";
import { useFaculty } from "../hooks/useFaculty";
import "./Pages.css";

const Faculty = () => {
	// Use Faculty Context for dynamic data
	const { faculty, departments, loading, error, actions } = useFaculty();

	const { fetchFaculty, fetchDepartments } = actions;

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");

	// Load faculty data on component mount
	useEffect(() => {
		fetchFaculty({
			page: 1,
			limit: 100, // Get all faculty for public display
		});
		fetchDepartments();
	}, [fetchFaculty, fetchDepartments]);

	// Filter faculty based on search and department - only show active faculty on public page
	const filteredFaculty = faculty.filter((member) => {
		// Only show active faculty on public page
		if (member.status !== "Active") return false;

		const matchesSearch =
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDepartment =
			selectedDepartment === "All" || member.department === selectedDepartment;

		return matchesSearch && matchesDepartment;
	});

	// Get featured faculty (active faculty marked as featured)
	const featuredFaculty = faculty.filter(
		(member) => member.featured && member.status === "Active"
	);

	// Format departments for dropdown (exclude "All" if it exists in DB data)
	const departmentOptions = [
		"All",
		...departments.filter((dept) => dept !== "All"),
	];

	return (
		<div className="faculty-page">
			{/* Page Header */}
			<section className="page-header bg-primary text-white py-5 mt-5">
				<Container>
					<Row className="text-center">
						<Col>
							<h1 className="display-4 fw-bold">
								<FaGraduationCap className="me-3" />
								Our Faculty
							</h1>
							<p className="lead">
								Meet our world-class educators and researchers who are shaping
								the future
							</p>
							{featuredFaculty.length > 0 && (
								<p className="text-light">
									<FaAward className="me-2" />
									Featuring {featuredFaculty.length} Distinguished Faculty
									Members
								</p>
							)}
						</Col>
					</Row>
				</Container>
			</section>

			{/* Search and Filters */}
			<section className="py-4 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col md={8}>
							<InputGroup>
								<InputGroup.Text>
									<FaSearch />
								</InputGroup.Text>
								<Form.Control
									type="text"
									placeholder="Search faculty by name, department, or specialization..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									disabled={loading}
								/>
							</InputGroup>
						</Col>
						<Col md={4}>
							<Form.Select
								value={selectedDepartment}
								onChange={(e) => setSelectedDepartment(e.target.value)}
								disabled={loading}
							>
								{departmentOptions.map((department) => (
									<option key={department} value={department}>
										{department === "All" ? "All Departments" : department}
									</option>
								))}
							</Form.Select>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Error Alert */}
			{error && (
				<Container>
					<Alert variant="danger" className="my-4">
						<strong>Error:</strong> {error}
					</Alert>
				</Container>
			)}

			{/* Loading State */}
			{loading && (
				<section className="py-5">
					<Container>
						<Row>
							<Col className="text-center">
								<Spinner animation="border" role="status" size="lg">
									<span className="visually-hidden">Loading faculty...</span>
								</Spinner>
								<p className="mt-3 text-muted">
									Loading faculty information...
								</p>
							</Col>
						</Row>
					</Container>
				</section>
			)}

			{/* Faculty Grid */}
			{!loading && (
				<section className="py-5">
					<Container>
						{/* Faculty Stats */}
						<Row className="mb-4">
							<Col className="text-center">
								<p className="text-muted">
									<FaUserGraduate className="me-2" />
									Showing {filteredFaculty.length} of{" "}
									{faculty.filter((f) => f.status === "Active").length} active
									faculty members
								</p>
							</Col>
						</Row>

						<Row>
							{filteredFaculty.map((member) => (
								<Col lg={4} md={6} className="mb-4" key={member.id}>
									<Card className="faculty-card h-100 shadow-sm">
										<div className="faculty-image-container position-relative">
											{member.profileImage ? (
												<img
													src={member.profileImage}
													alt={member.name}
													className="faculty-image"
													style={{
														width: "100%",
														height: "250px",
														objectFit: "cover",
													}}
												/>
											) : (
												<div
													className="faculty-image d-flex align-items-center justify-content-center bg-light"
													style={{
														width: "100%",
														height: "250px",
													}}
												>
													<FaUserGraduate size={60} className="text-muted" />
												</div>
											)}
											{member.featured && (
												<div className="position-absolute top-0 end-0 m-2">
													<Badge bg="warning" className="featured-text">
														<FaAward className="me-1" />
														Distinguished
													</Badge>
												</div>
											)}
										</div>

										<Card.Body className="text-center">
											<h5 className="faculty-name mb-1">{member.name}</h5>
											<p className="faculty-title text-primary mb-2">
												{member.title}
											</p>
											<Badge bg="secondary" className="mb-3">
												{member.department}
											</Badge>

											{member.specialization && (
												<p className="faculty-specialization text-muted mb-3">
													{member.specialization}
												</p>
											)}

											<div className="faculty-contact mb-3">
												{member.email && (
													<div className="d-flex justify-content-center align-items-center mb-2">
														<FaEnvelope className="me-2 text-primary" />
														<small>{member.email}</small>
													</div>
												)}
												{member.phone && (
													<div className="d-flex justify-content-center align-items-center">
														<FaPhone className="me-2 text-primary" />
														<small>{member.phone}</small>
													</div>
												)}
											</div>

											<Button
												variant="outline-primary"
												size="sm"
												className="w-100"
											>
												<FaLinkedin className="me-2" />
												View Profile
											</Button>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>

						{!loading && filteredFaculty.length === 0 && (
							<Row>
								<Col className="text-center py-5">
									{faculty.filter((f) => f.status === "Active").length === 0 ? (
										<>
											<h4>No faculty members available</h4>
											<p className="text-muted">
												Faculty information will be displayed here once added.
											</p>
										</>
									) : (
										<>
											<h4>No faculty members found</h4>
											<p className="text-muted">
												Try adjusting your search criteria
											</p>
										</>
									)}
								</Col>
							</Row>
						)}
					</Container>
				</section>
			)}
		</div>
	);
};

export default Faculty;
