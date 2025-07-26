
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

const Faculty = () => {
	// Sample faculty data - in real app, this would come from an API
	const [faculty] = useState([
		
			
		{
			id: 2,
			name: "Dr. Vikash Yadav",
			title: "Associate Professor of Multiple Computer Launguages",
			department: "Computer Launguages",
			education: "Ph.D. Amity University, Patna ",
			specialization: "Java, React, Python, C++",
			experience: "12 years",
			email: "vikashkelly@gmail.com",
			phone: "+91-9199697225",
			office: "Business Building, Room 205",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr. Yadav is a leading expert in computer languages with over a decade of teaching and research experience. He has published numerous papers on programming languages and software development.",
			achievements: [
				"Best Codder Award at Amity University patna in 2025",
				"All India Hackathon Winner 2025",
				"codder of the year 2025 at C Das Patna",
				
			],
			courses: [
				"Advanced Java Programming",
				"React Development",
				"Python for Data Science",
				"C++ Programming Fundamentals",
				"Web Development with React",
			],
			featured: false,
		},
		{
			id: 3,
			name: "Dr. Kanchana Return",
			title: "Professor of Data Scructures and Algorithms",
			department: "C Programming",
			education: "Ph.D. Computer Science, MIT",
			specialization: "Data Structures, Algorithms, Machine Learning",
			experience: "1 years",
			email: "Kanchanareturn68345@gmail.com",
			phone: "+91-7050010897",
			office: "Science Building, Room 415",
			image:
				"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr.  Kanchana Return is a passionate educator and researcher in the field of data structures and algorithms. With a strong foundation in computer science, she has contributed to various innovative projects and has a keen interest in machine learning applications.",
			
			achievements: [
				"Data Structures Excellence Award 2023",
				"Top 10 Algorithms Researcher 2024",
				"Machine Learning Innovator 2025",
			],
			courses: ["Data Structures and Algorithms", "Machine Learning Basics", "Advanced C Programming"],
			featured: true,
		},
		{
			id: 4,
			name: "Dr. Hari om",
			title: "Associate Professor of Robotics and Automation",
			department: "Engineering",
			education: "Ph.D. Robotics, Stanford University",
			specialization: "Robotics, Automation",
			experience: "18 years",
			email: "hariom.21242@gmail.com",
			phone: "+91-8294447219",
			office: "Engineering Building, Room 120",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr. Hari om is a distinguished researcher in robotics and automation, with extensive experience in developing cutting-edge robotic systems and automation solutions. His work has significantly advanced the field of robotics engineering.",
			achievements: [
				"Robotics Innovation Award 2023",
				"Industry Partnership",
				"Robotics Excellence Award 2024",
				"Automation Leader 2025",
				
			],
			courses: ["Robotics Engineering", "Control Systems", "Automation Design"],
			featured: false,
		},
		{
			id: 5,
			name: "Dr. Pawan Kumar",
			title: "Professor of International Relations",
			department: "OPerating System and Networking",
			education: "Ph.D. Political Science, Harvard University",
			specialization: "Linex, Networking, Cybersecurity",
			experience: "20 years",
			email: "pawan7457@gmail.com",
			phone: "+91-9365678475",
			office: "Liberal Arts Building, Room 308",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Dr. Pawan Kumar is a renowned scholar in international relations, focusing on the intersection of technology and global politics. With over two decades of experience, he has contributed significantly to the understanding of cybersecurity and its implications for international security.",
			achievements: ["UN Advisor", 
				"Fulbright Scholar", 
				"Diplomatic Medal"
			],
			courses: [
				"International Relations",
				"Diplomatic Studies",
				"Global Politics",
				"Cybersecurity and International Relations",
				
			],
			featured: true,
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
							<Col lg={3} md={6} className="mb-4" key={member.id}>
								<Card className="faculty-card h-70">
									{member.featured && (
										<div className="featured-badge">
											<Badge bg="warning" className="featured-text">
												<FaAward className="me-1" />
												Distinguished
											</Badge>
										</div>
									)}

									<div className="faculty-image-container">
										<img
											src={member.image}
											alt={member.name}
											className="faculty-image"
										/>
									</div>

									<Card.Body className="d-flex flex-column">
										<div className="faculty-header mb-3">
											<h5 className="faculty-name">{member.name}</h5>
											<p className="faculty-title text-primary mb-1">
												{member.title}
											</p>
											<Badge bg="secondary" className="department-badge">
												{member.department}
											</Badge>
										</div>

										<div className="faculty-education mb-2">
											<small className="text-muted">
												<FaGraduationCap className="me-1" />
												{member.education}
											</small>
										</div>

										<div className="faculty-specialization mb-3">
											<strong>Specialization:</strong>
											<p className="text-muted mb-0">{member.specialization}</p>
										</div>

										<p className="faculty-bio">{member.bio}</p>

										<div className="faculty-achievements mb-3">
											<h6 className="mb-2">Achievements:</h6>
											<div className="d-flex flex-wrap gap-1">
												{member.achievements.map((achievement, index) => (
													<Badge
														key={index}
														bg="success"
														className="achievement-badge"
													>
														{achievement}
													</Badge>
												))}
											</div>
										</div>

										<div className="faculty-courses mb-3">
											<h6 className="mb-2">Courses:</h6>
											<div className="d-flex flex-wrap gap-1">
												{member.courses.map((course, index) => (
													<Badge
														key={index}
														bg="light"
														text="dark"
														className="course-badge"
													>
														<FaBook className="me-1" />
														{course}
													</Badge>
												))}
											</div>
										</div>

										<div className="mt-auto">
											<div className="faculty-contact">
												<div className="contact-item">
													<FaEnvelope className="contact-icon" />
													<small>{member.email}</small>
												</div>
												<div className="contact-item">
													<FaPhone className="contact-icon" />
													<small>{member.phone}</small>
												</div>
												<div className="contact-item mb-3">
													<FaGraduationCap className="contact-icon" />
													<small>{member.office}</small>
												</div>
											</div>
											<Button variant="outline-primary" className="w-100">
												<FaLinkedin className="me-2" />
												View Profile
											</Button>
										</div>
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
