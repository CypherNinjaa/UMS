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
			name: "Dr. Nihal Kapoor",
			title: "President",
			image:
				"https://imgs.search.brave.com/MvRGNF9qCMVIpN_N9_29TqA6T2Pq7BSt2TLlGDpRB6o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIw/NTI4MDEwMi9waG90/by9tYW4taW4tZnJv/bnQtb2YtYmxhY2ti/b2FyZC1hdC1zY2hv/b2wuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUVVcVp2ZUlv/YTVNNGZkdFBQaXA0/aVN5R1h1YXBxckpF/S3UtY18tWVJQcmM9",
			bio: "Leading EduVerse University with 20+ years of academic leadership experience.",
		},
		{
			id: 2,
			name: "Dr. Sahil Khurana",
			title: "Vice President Academic Affairs",
			image:
				"https://imgs.search.brave.com/PPjdypRcmw3m5l0TtpKZLGyH_ap3yEv7DcOxYcjfCCw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC10ZWFj/aGVyLXdvcmstZWR1/Y2F0aW9uYWwtc3lz/dGVtXzIzLTIxNTE3/MzczNDEuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA",
			bio: "Overseeing academic excellence and curriculum development across all departments.",
		},
		{
			id: 3,
			name: "Dr. Sandip Singh",
			title: "Vice President Research",
			image:
				"https://imgs.search.brave.com/WMPFkOQg-tsoAWYn9roMUN3KTgpHnWYksLZWnh3w0ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzAzLzMwLzYx/LzM2MF9GXzYwMzMw/NjE5M182bDNzN1JL/aHdxNlZidlJjYjRr/SjUxUTFwRHFocEFO/TC5qcGc",
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
				"https://imgs.search.brave.com/1-yINg06LaegjNzwggby3T72USA-KCBQmfLza1whFYk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIx/ODkzMTU3NC9waG90/by9oYXBweS1zdHVk/ZW50cy10YWxraW5n/LXdoaWxlLWhhdmlu/Zy1sdW5jaC1icmVh/ay1hdC1jYWZldGVy/aWEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPURvbDhPcldt/VFVsOUpOOFh3OWpr/M2JIV1VDTkVmM0tt/WktMUjY3bEZDcTQ9",
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
										To empower individuals and organizations through accessible, high-quality digital solutions that foster learning, innovation, and meaningful growth. We are committed to creating impactful experiences that inspire progress and drive positive change in a connected world.
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
										To be a trusted global leader in digital transformation and learning, shaping the future by enabling lifelong development, innovation, and inclusion through technology and human-centered design.
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
										<li>Excellence — We pursue the highest standards in everything we do.</li>
										<li> Innovation — We embrace creativity and continuously explore new ideas.</li>
										<li> Integrity — We act with transparency, honesty, and accountability.</li>
										<li>Collaboration — We believe in the power of teamwork and diverse perspectives.</li>
										<li>Inclusion — We create spaces where everyone belongs and thrives.</li>
										<li>Impact — We focus on outcomes that matter to people and society.</li>
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
