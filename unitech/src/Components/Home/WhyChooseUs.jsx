import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import {
	FaGraduationCap,
	FaUsers,
	FaGlobe,
	FaAward,
	FaBook,
	FaLaptop,
	FaHandshake,
	FaStar,
} from "react-icons/fa";
import "./WhyChooseUs.css";

const WhyChooseUs = () => {
	// Key features and benefits data
	const features = [
		{
			id: 1,
			icon: FaGraduationCap,
			title: "Academic Excellence",
			description:
				"Top-ranked programs with world-class faculty and cutting-edge curriculum designed for success.",
			color: "primary",
		},
		{
			id: 2,
			icon: FaUsers,
			title: "Diverse Community",
			description:
				"Learn alongside students from over 80 countries in an inclusive, multicultural environment.",
			color: "success",
		},
		{
			id: 3,
			icon: FaGlobe,
			title: "Global Opportunities",
			description:
				"Study abroad programs, international internships, and global partnership opportunities.",
			color: "info",
		},
		{
			id: 4,
			icon: FaAward,
			title: "Industry Recognition",
			description:
				"Degrees recognized worldwide with strong industry connections and job placement rates.",
			color: "warning",
		},
		{
			id: 5,
			icon: FaBook,
			title: "Research Excellence",
			description:
				"Leading research facilities and opportunities to work on groundbreaking projects.",
			color: "danger",
		},
		{
			id: 6,
			icon: FaLaptop,
			title: "Modern Technology",
			description:
				"State-of-the-art labs, digital learning platforms, and innovative teaching methods.",
			color: "secondary",
		},
	];
	return (
		<section id="why-choose-us" className="why-choose-section py-5">
			<Container>
				{/* section header goes here */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title text-warning">Why Choose Us</h2>
						<p className="section-subtitle">
							Discover what makes us the preferred choice for students worldwide
						</p>
					</Col>
				</Row>

				{/* Features Grid */}
				<Row className="mb-5">
					{features.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Col lg={4} md={6} key={feature.id} className="mb-4">
								<Card className="feature-card h-100">
									<Card.Body className="text-center">
										<div className={`feature-icon bg-${feature.color}`}>
											<IconComponent size={35} />
										</div>
										<h4 className="feature-title">{feature.title}</h4>
										<p className="feature-description">{feature.description}</p>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				{/* Call to Action */}
				<Row className="text-center mt-5">
					<Col>
						<div className="cta-section">
							<h3 className="cta-title">Ready to Join Our Community?</h3>
							<p className="cta-subtitle">
								Take the first step towards your bright future with EduVerse
								University
							</p>
							<div className="cta-buttons">
								<button
									className="btn btn-primary btn-lg me-3"
									onClick={() => alert("Apply Now - Coming soon!")}
								>
									Apply Now
								</button>
								<button
									className="btn btn-outline-primary btn-lg"
									onClick={() =>
										document
											.getElementById("contact")
											.scrollIntoView({ behavior: "smooth" })
									}
								>
									Contact Us
								</button>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
export default WhyChooseUs;
