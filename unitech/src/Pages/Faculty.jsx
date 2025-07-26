import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Form,
	InputGroup,
} from "react-bootstrap";
import {
	FaSearch,
	FaEnvelope,
	FaPhone,
	FaGraduationCap,
	FaBook,
	FaAward,
	FaLinkedin,
} from "react-icons/fa";
import "./Pages.css";

const Faculty = () => {
	// Sample faculty data - in real app, this would come from an API
	const [faculty] = useState([
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			title: "Professor of Computer Science",
			department: "Computer Science",
			specialization: "Artificial Intelligence, Machine Learning",
			email: "sarah.johnson@eduverse.edu",
			phone: "+1-555-0101",
			image:
				"https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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
			image:
				"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
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
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
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
			image:
				"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
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
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
			featured: false,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("All");

	// Get unique departments for filter
	const departments = [
		"All",
		...new Set(faculty.map((member) => member.department)),
	];

	// Filter faculty based on search and department
	const filteredFaculty = faculty.filter((member) => {
		const matchesSearch =
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.department.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesDepartment =
			selectedDepartment === "All" || member.department === selectedDepartment;

		return matchesSearch && matchesDepartment;
	});

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
								/>
							</InputGroup>
						</Col>
						<Col md={4}>
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
					</Row>
				</Container>
			</section>

			{/* Faculty Grid */}
			<section className="py-5">
				<Container>
					<Row>
						{filteredFaculty.map((member) => (
							<Col lg={4} md={6} className="mb-4" key={member.id}>
								<Card className="faculty-card h-100 shadow-sm">
									<div className="faculty-image-container position-relative">
										<img
											src={member.image}
											alt={member.name}
											className="faculty-image"
										/>
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

										<p className="faculty-specialization text-muted mb-3">
											{member.specialization}
										</p>

										<div className="faculty-contact mb-3">
											<div className="d-flex justify-content-center align-items-center mb-2">
												<FaEnvelope className="me-2 text-primary" />
												<small>{member.email}</small>
											</div>
											<div className="d-flex justify-content-center align-items-center">
												<FaPhone className="me-2 text-primary" />
												<small>{member.phone}</small>
											</div>
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

					{filteredFaculty.length === 0 && (
						<Row>
							<Col className="text-center py-5">
								<h4>No faculty members found</h4>
								<p className="text-muted">Try adjusting your search criteria</p>
							</Col>
						</Row>
					)}
				</Container>
			</section>
		</div>
	);
};

export default Faculty;
