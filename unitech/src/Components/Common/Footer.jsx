import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaYoutube,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaGraduationCap,
	FaArrowUp,
	FaHeart,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="footer">
			{/* Main Footer Content */}
			<div className="footer-main">
				<Container>
					<Row>
						{/* University Info */}
						<Col lg={4} md={6} className="mb-4">
							<div className="footer-section">
								<div className="footer-logo">
									<FaGraduationCap className="logo-icon" />
									<h4 className="university-name">EduVerse University</h4>
								</div>
								<p className="footer-description">
									Empowering minds, shaping futures. Join thousands of students
									in their journey to academic excellence and personal growth at
									one of the world's leading universities.
								</p>
								<div className="social-links">
									<a
										href="#"
										className="social-link facebook"
										aria-label="Facebook"
									>
										<FaFacebookF />
									</a>
									<a
										href="#"
										className="social-link twitter"
										aria-label="Twitter"
									>
										<FaTwitter />
									</a>
									<a
										href="#"
										className="social-link instagram"
										aria-label="Instagram"
									>
										<FaInstagram />
									</a>
									<a
										href="#"
										className="social-link linkedin"
										aria-label="LinkedIn"
									>
										<FaLinkedinIn />
									</a>
									<a
										href="#"
										className="social-link youtube"
										aria-label="YouTube"
									>
										<FaYoutube />
									</a>
								</div>
							</div>
						</Col>

						{/* Quick Links */}
						<Col lg={2} md={6} className="mb-4">
							<div className="footer-section">
								<h5 className="footer-title">Quick Links</h5>
								<ul className="footer-links">
									<li>
										<a href="#home">Home</a>
									</li>
									<li>
										<a href="#about">About Us</a>
									</li>
									<li>
										<a href="#programs">Programs</a>
									</li>
									<li>
										<a href="#admissions">Admissions</a>
									</li>
									<li>
										<a href="#research">Research</a>
									</li>
									<li>
										<a href="#campus-life">Campus Life</a>
									</li>
								</ul>
							</div>
						</Col>

						{/* Academic */}
						<Col lg={2} md={6} className="mb-4">
							<div className="footer-section">
								<h5 className="footer-title">Academic</h5>
								<ul className="footer-links">
									<li>
										<a href="#undergraduate">Undergraduate</a>
									</li>
									<li>
										<a href="#graduate">Graduate</a>
									</li>
									<li>
										<a href="#online-programs">Online Programs</a>
									</li>
									<li>
										<a href="#international">International</a>
									</li>
									<li>
										<a href="#library">Library</a>
									</li>
									<li>
										<a href="#academic-calendar">Academic Calendar</a>
									</li>
								</ul>
							</div>
						</Col>

						{/* Student Services */}
						<Col lg={2} md={6} className="mb-4">
							<div className="footer-section">
								<h5 className="footer-title">Student Services</h5>
								<ul className="footer-links">
									<li>
										<a href="#student-portal">Student Portal</a>
									</li>
									<li>
										<a href="#financial-aid">Financial Aid</a>
									</li>
									<li>
										<a href="#career-services">Career Services</a>
									</li>
									<li>
										<a href="#housing">Housing</a>
									</li>
									<li>
										<a href="#health-services">Health Services</a>
									</li>
									<li>
										<a href="#support">Student Support</a>
									</li>
								</ul>
							</div>
						</Col>

						{/* Contact Info */}
						<Col lg={2} md={6} className="mb-4">
							<div className="footer-section">
								<h5 className="footer-title">Contact Us</h5>
								<div className="contact-info">
									<div className="contact-item">
										<FaMapMarkerAlt className="contact-icon" />
										<span>
											123 University Ave
											<br />
											Education City, ED 12345
										</span>
									</div>
									<div className="contact-item">
										<FaPhone className="contact-icon" />
										<span>+1 (555) 123-4567</span>
									</div>
									<div className="contact-item">
										<FaEnvelope className="contact-icon" />
										<span>info@eduverse.edu</span>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Newsletter Section */}
			<div className="footer-newsletter">
				<Container>
					<Row className="align-items-center">
						<Col lg={8}>
							<div className="newsletter-content">
								<h4 className="newsletter-title">Stay Connected</h4>
								<p className="newsletter-description">
									Subscribe to our newsletter for the latest updates, events,
									and academic opportunities.
								</p>
							</div>
						</Col>
						<Col lg={4}>
							<div className="newsletter-form">
								<div className="input-group">
									<input
										type="email"
										className="form-control"
										placeholder="Enter your email"
										aria-label="Email address"
									/>
									<Button className="subscribe-btn" type="button">
										Subscribe
									</Button>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Footer Bottom */}
			<div className="footer-bottom">
				<Container>
					<Row className="align-items-center">
						<Col lg={6}>
							<div className="copyright">
								<p>
									&copy; 2025 EduVerse University. Made with{" "}
									<FaHeart className="heart-icon" /> for education.
								</p>
							</div>
						</Col>
						<Col lg={6}>
							<div className="footer-bottom-links">
								<a href="#privacy">Privacy Policy</a>
								<a href="#terms">Terms of Service</a>
								<a href="#accessibility">Accessibility</a>
								<a href="#sitemap">Sitemap</a>
							</div>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Scroll to Top Button */}
			<button
				className="scroll-to-top"
				onClick={scrollToTop}
				aria-label="Scroll to top"
			>
				<FaArrowUp />
			</button>
		</footer>
	);
};

export default Footer;
