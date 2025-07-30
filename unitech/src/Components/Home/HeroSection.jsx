import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGraduationCap, FaArrowRight, FaPlay } from "react-icons/fa";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
	const navigate = useNavigate();
	return (
		<section id="home" className="hero-section">
			<div className="hero-overlay"></div>
			<Container className="hero-content">
				<Row className="align-items-center min-vh-4">
					<Col lg={6} className="hero-text">
						<h1 className="hero-title">
							Welcome to
							<span className="text-warning">EduVerse University</span>
						</h1>
						<p className="hero-subtitle">
							Empowering minds, shaping futures. Join thousands of students in
							their journey to academic excellence and personal growth at one of
							the world's leading universities.
						</p>
						<div className="hero-highlights">
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>40,000+ Graduates</span>
							</div>
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>100+ Programs</span>
							</div>
							<div className="highlight-item">
								<FaGraduationCap className="highlight-icon" />
								<span>World-Class Faculty</span>
							</div>
						</div>
						<div className="hero-buttons">
							<Button
								onClick={() => {
									navigate("/Programs");
								}}
								variant="outline-light"
								size="lg"
								className="btn bg-warning me-3"
							>
								Explore Programs
								{/* margin start */}
								<FaArrowRight className="ms-2" />
							</Button>
						
						</div>
					</Col>
					<Col lg={6} className="hero-image">
						<img src="/masterclass_human_web.webp" alt="students studying" />
					</Col>
				</Row>
			</Container>
			{/* Scroll indicator */}
			<div className="scroll-indicator">
				<div className="scroll-arrow"></div>
			</div>
		</section>
	);
};
export default HeroSection;
