import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
	FaUniversity,
	FaEye,
	FaHeart,
	FaUsers,
	FaGlobe,
	FaTrophy,
	FaHistory,
	FaAward,
} from "react-icons/fa";
import "./Pages.css";

const About = () => {
	// University stats data
	const stats = [
		{
			id: 1,
			icon: FaUsers,
			value: "50,000+",
			label: "Students",
			description: "From over 80 countries",
		},
		{
			id: 2,
			icon: FaGlobe,
			value: "100+",
			label: "Programs",
			description: "Undergraduate & Graduate",
		},
		{
			id: 3,
			icon: FaTrophy,
			value: "#15",
			label: "Global Ranking",
			description: "Top universities worldwide",
		},
		{
			id: 4,
			icon: FaAward,
			value: "95%",
			label: "Graduate Success",
			description: "Employment within 6 months",
		},
	];

	// Leadership team data
	const leadership = [
		{
			id: 1,
			name: "Dr. Margaret Williams",
			title: "President",
			image:
				"https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
			bio: "Leading EduVerse University with 20+ years of academic leadership experience.",
		},
		{
			id: 2,
			name: "Dr. James Patterson",
			title: "Vice President Academic Affairs",
			image:
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
			bio: "Overseeing academic excellence and curriculum development across all departments.",
		},
		{
			id: 3,
			name: "Dr. Sandra Kumar",
			title: "Vice President Research",
			image:
				"https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
			bio: "Leading groundbreaking research initiatives and fostering innovation.",
		},
	];

	// Campus facilities data
	const facilities = [
		{
			id: 1,
			name: "Central Library",
			description:
				"5-story modern library with over 2 million books and digital resources",
			image:
				"https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		},
		{
			id: 2,
			name: "Research Centers",
			description:
				"State-of-the-art laboratories and research facilities for all disciplines",
			image:
				"https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		},
		{
			id: 3,
			name: "Student Center",
			description:
				"Hub for student activities, dining, recreation, and community engagement",
			image:
				"https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
		},
	];

	return (
		<div className="about-page mt-5">
			{/* Page Header */}
			<section className="page-header bg-primary text-white py-5">
				<Container>
					<Row className="text-center">
						<Col>
							<h1 className="display-4 fw-bold">
								<FaUniversity className="me-3" />
								About EduVerse University
							</h1>
							<p className="lead">
								Empowering minds and shaping futures since 1965
							</p>
						</Col>
					</Row>
				</Container>
			</section>

			{/* University Stats */}
			<section className="py-5 bg-light">
				<Container>
					<Row>
						{stats.map((stat) => (
							<Col md={3} className="mb-4" key={stat.id}>
								<Card className="stat-card text-center h-100 border-0 shadow-sm">
									<Card.Body>
										<stat.icon
											className="stat-icon text-primary mb-3"
											size={40}
										/>
										<h3 className="stat-value text-primary">{stat.value}</h3>
										<h5 className="stat-label">{stat.label}</h5>
										<p className="stat-description text-muted mb-0">
											{stat.description}
										</p>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Mission, Vision, Values */}
			<section className="py-5">
				<Container>
					<Row>
						<Col lg={4} className="mb-4">
							<Card className="mission-card h-100 border-0 shadow">
								<Card.Body className="text-center">
									<FaHeart
										className="mission-icon text-danger mb-3"
										size={50}
									/>
									<h4 className="mission-title">Our Mission</h4>
									<p className="mission-text">
										To provide transformative education that empowers students
										to become global leaders, critical thinkers, and responsible
										citizens who contribute positively to society and advance
										human knowledge.
									</p>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4} className="mb-4">
							<Card className="vision-card h-100 border-0 shadow">
								<Card.Body className="text-center">
									<FaEye className="vision-icon text-success mb-3" size={50} />
									<h4 className="vision-title">Our Vision</h4>
									<p className="vision-text">
										To be a globally recognized university that leads in
										educational innovation, groundbreaking research, and social
										impact, creating a better world through knowledge and
										discovery.
									</p>
								</Card.Body>
							</Card>
						</Col>
						<Col lg={4} className="mb-4">
							<Card className="values-card h-100 border-0 shadow">
								<Card.Body className="text-center">
									<FaTrophy
										className="values-icon text-warning mb-3"
										size={50}
									/>
									<h4 className="values-title">Our Values</h4>
									<ul className="values-list text-start">
										<li>Excellence in education and research</li>
										<li>Diversity and inclusion</li>
										<li>Innovation and creativity</li>
										<li>Integrity and ethical conduct</li>
										<li>Global citizenship</li>
									</ul>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>

			{/* University History */}
			<section className="py-5 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col lg={6}>
							<h2 className="section-title">
								<FaHistory className="me-3" />
								Our History
							</h2>
							<p className="history-text">
								Founded in 1965, EduVerse University began as a small college
								with a vision to provide quality higher education. Over the
								decades, we have grown into a prestigious institution recognized
								worldwide for academic excellence.
							</p>
							<p className="history-text">
								From our humble beginnings with 500 students, we now serve over
								50,000 students from around the globe. Our commitment to
								innovation in education and groundbreaking research has earned
								us numerous accolades and partnerships with leading institutions
								worldwide.
							</p>
							<div className="timeline-highlights">
								<div className="timeline-item">
									<strong>1965:</strong> University founded with 3 departments
								</div>
								<div className="timeline-item">
									<strong>1980:</strong> First graduate programs established
								</div>
								<div className="timeline-item">
									<strong>1995:</strong> International partnerships began
								</div>
								<div className="timeline-item">
									<strong>2010:</strong> Major campus expansion completed
								</div>
								<div className="timeline-item">
									<strong>2020:</strong> Leading digital transformation in
									education
								</div>
							</div>
						</Col>
						<Col lg={6}>
							<img
								src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
								alt="University Campus Historical View"
								className="history-image"
							/>
						</Col>
					</Row>
				</Container>
			</section>

			{/* Leadership Team */}
			<section className="py-5">
				<Container>
					<Row className="text-center mb-5">
						<Col>
							<h2 className="section-title">Leadership Team</h2>
							<p className="section-subtitle">
								Meet the visionary leaders guiding our university's mission
							</p>
						</Col>
					</Row>
					<Row>
						{leadership.map((leader) => (
							<Col lg={4} md={6} className="mb-4" key={leader.id}>
								<Card className="leader-card text-center border-0 shadow">
									<div className="leader-image-container">
										<img
											src={leader.image}
											alt={leader.name}
											className="leader-image"
										/>
									</div>
									<Card.Body>
										<h5 className="leader-name">{leader.name}</h5>
										<p className="leader-title text-primary">{leader.title}</p>
										<p className="leader-bio text-muted">{leader.bio}</p>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Campus Facilities */}
			<section className="py-5 bg-light">
				<Container>
					<Row className="text-center mb-5">
						<Col>
							<h2 className="section-title">Campus Facilities</h2>
							<p className="section-subtitle">
								World-class facilities supporting learning, research, and
								student life
							</p>
						</Col>
					</Row>
					<Row>
						{facilities.map((facility) => (
							<Col lg={4} md={6} className="mb-4" key={facility.id}>
								<Card className="facility-card border-0 shadow">
									<div className="facility-image-container">
										<img
											src={facility.image}
											alt={facility.name}
											className="facility-image"
										/>
									</div>
									<Card.Body>
										<h5 className="facility-name">{facility.name}</h5>
										<p className="facility-description text-muted">
											{facility.description}
										</p>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</section>

			{/* Call to Action */}
			<section className="py-5 bg-primary text-white text-center">
				<Container>
					<Row>
						<Col>
							<h2 className="cta-title">Ready to Join Our Community?</h2>
							<p className="cta-subtitle">
								Discover the opportunities that await you at EduVerse University
							</p>
							<Button variant="light" size="lg" className="cta-button">
								Apply Now
							</Button>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default About;
