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
	FaGraduationCap,
	FaSearch,
	FaClock,
	FaUsers,
	FaStar,
	FaBookOpen,
} from "react-icons/fa";
import "./Pages.css";

const Programs = () => {
	// Sample programs data - in real app, this would come from an API
	const [programs] = useState([
		{
			id: 1,
			title: "Computer Science",
			level: "Bachelor's",
			duration: "4 years",
			category: "Technology",
			description:
				"Comprehensive program covering software development, algorithms, data structures, and emerging technologies.",
			features: [
				"AI & Machine Learning",
				"Software Engineering",
				"Cybersecurity",
				"Data Science",
			],
			rating: 4.8,
			students: 1200,
			featured: true,
		},
		{
			id: 2,
			title: "Business Administration",
			level: "Master's",
			duration: "2 years",
			category: "Business",
			description:
				"Advanced business program focusing on leadership, strategy, and global business practices.",
			features: [
				"Strategic Management",
				"Financial Analysis",
				"Marketing",
				"Operations",
			],
			rating: 4.7,
			students: 800,
			featured: true,
		},
		{
			id: 3,
			title: "Biomedical Engineering",
			level: "Bachelor's",
			duration: "4 years",
			category: "Engineering",
			description:
				"Interdisciplinary program combining engineering principles with biological sciences.",
			features: [
				"Medical Devices",
				"Biomaterials",
				"Tissue Engineering",
				"Bioinformatics",
			],
			rating: 4.6,
			students: 450,
			featured: false,
		},
		{
			id: 4,
			title: "International Relations",
			level: "Bachelor's",
			duration: "4 years",
			category: "Liberal Arts",
			description:
				"Study global politics, diplomacy, and international cooperation in our interconnected world.",
			features: [
				"Global Politics",
				"Diplomatic Studies",
				"International Law",
				"Cultural Studies",
			],
			rating: 4.5,
			students: 600,
			featured: false,
		},
		{
			id: 5,
			title: "Data Science",
			level: "Master's",
			duration: "1.5 years",
			category: "Technology",
			description:
				"Advanced program in data analysis, machine learning, and statistical modeling.",
			features: [
				"Big Data Analytics",
				"Machine Learning",
				"Statistical Modeling",
				"Data Visualization",
			],
			rating: 4.9,
			students: 300,
			featured: true,
		},
		{
			id: 6,
			title: "Environmental Science",
			level: "Bachelor's",
			duration: "4 years",
			category: "Science",
			description:
				"Comprehensive study of environmental systems and sustainability practices.",
			features: [
				"Climate Science",
				"Conservation Biology",
				"Environmental Policy",
				"Sustainability",
			],
			rating: 4.4,
			students: 350,
			featured: false,
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedLevel, setSelectedLevel] = useState("All");

	// Get unique categories and levels for filters
	const categories = [
		"All",
		...new Set(programs.map((program) => program.category)),
	];
	const levels = ["All", ...new Set(programs.map((program) => program.level))];

	// Filter programs based on search and filters
	const filteredPrograms = programs.filter((program) => {
		const matchesSearch =
			program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			program.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || program.category === selectedCategory;
		const matchesLevel =
			selectedLevel === "All" || program.level === selectedLevel;

		return matchesSearch && matchesCategory && matchesLevel;
	});

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Technology: "primary",
			Business: "success",
			Engineering: "warning",
			"Liberal Arts": "info",
			Science: "secondary",
		};
		return colors[category] || "secondary";
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
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</Form.Select>
						</Col>
						<Col md={3}>
							<Form.Select
								value={selectedLevel}
								onChange={(e) => setSelectedLevel(e.target.value)}
							>
								{levels.map((level) => (
									<option key={level} value={level}>
										{level}
									</option>
								))}
							</Form.Select>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Programs Grid */}
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
												<h5 className="program-title">{program.title}</h5>
												<Badge bg={getCategoryColor(program.category)}>
													{program.category}
												</Badge>
											</div>
											<div className="d-flex align-items-center text-muted mb-2">
												<FaGraduationCap className="me-2" />
												<span>{program.level}</span>
												<FaClock className="ms-3 me-2" />
												<span>{program.duration}</span>
											</div>
										</div>

										<p className="program-description">{program.description}</p>

										<div className="program-features mb-3">
											<h6 className="mb-2">Key Areas:</h6>
											<div className="d-flex flex-wrap gap-1">
												{program.features.map((feature, index) => (
													<Badge
														key={index}
														bg="light"
														text="dark"
														className="feature-badge"
													>
														{feature}
													</Badge>
												))}
											</div>
										</div>

										<div className="program-stats mb-3">
											<Row className="text-center">
												<Col>
													<div className="stat">
														<FaUsers className="text-primary" />
														<div className="stat-value">{program.students}</div>
														<div className="stat-label">Students</div>
													</div>
												</Col>
												<Col>
													<div className="stat">
														<FaStar className="text-warning" />
														<div className="stat-value">{program.rating}</div>
														<div className="stat-label">Rating</div>
													</div>
												</Col>
											</Row>
										</div>

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

					{filteredPrograms.length === 0 && (
						<Row>
							<Col className="text-center py-5">
								<h4>No programs found</h4>
								<p className="text-muted">Try adjusting your search criteria</p>
							</Col>
						</Row>
					)}
				</Container>
			</section>
		</div>
	);
};

export default Programs;
