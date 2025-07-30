import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Carousel,
	Badge,
	Button,
} from "react-bootstrap";
import {
	FaQuoteLeft,
	FaLinkedin,
	FaTwitter,
	FaGraduationCap,
	FaArrowLeft,
	FaArrowRight,
} from "react-icons/fa";
import "./StudentSuccessStories.css";

const StudentSuccessStories = () => {
	// student success stories data
	const [stories] = useState([
		{
			id: 1,
			name: "Mr. Binod Sharma",
			program: "Computer Science",
			graduationYear: "2023",
			currentPosition: "Senior Software Engineer at Google",
			image: "https://imgs.search.brave.com/E_FKCuKsfuI6AjE1diS8uYsjsgo8ELB2N0uOc25B_Vs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtc3R1ZGVudC13/ZWFyaW5nLWJsYWNr/LWJhY2twYWNrLWhv/bGRpbmctY29weWJv/b2tzLWZpbGVzLWJs/dWUtd2FsbF8xNDA3/MjUtNDI2MzYuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MA", // Aap yaha image URL daal sakte hain
			story:
				"EduVerse University provided me with the technical skills and critical thinking abilities that landed me my dream job at Google. The collaborative projects and research opportunities were invaluable.",
			achievements: [
				"Google Software Engineer",
				"Published 2 Research Papers",
				"Dean's List 4 semesters",
			],
			category: "Technology",
			linkedin: "#",
			twitter: "#",
		},
		{
			id: 2,
			name: "Ms. Kunal Patel",
			program: "Business Administration",
			graduationYear: "2022",
			currentPosition: "Founder & CEO of TechStart Inc.",
			image:"https://imgs.search.brave.com/4aUwx_2S2949OG_Z-PcxQg0ALTqhYCxVWwAheC2JeTM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20va2FkZXR0bWFu/bi9rYWRldHRtYW5u/MjEwOC9rYWRldHRt/YW5uMjEwODAwMTc2/LzE3MzE1NDM4NC1z/dWNjZXNzZnVsLWNo/ZWVyaW5nLXNwYW5p/c2gtbWFsZS1zdHVk/ZW50LXdpdGgtZ3Jv/dXAtb2Ytb3RoZXIt/c3R1ZGVudHMtb3V0/ZG9vci1hdC1jYW1w/dXMtb2YuanBnP3Zl/cj02",
			story:
				"The entrepreneurship program at EduVerse gave me the confidence and knowledge to start my own company. We've now raised $5M in funding and employ 50 people.",
			achievements: [
				"Founded Successful Startup",
				"$5M Funding Raised",
				"50+ Employees",
			],
			category: "Entrepreneurship",
			linkedin: "#",
			twitter: "#",
		},
		{
			id: 3,
			name: "ms. Priya Singh",
			program: "Biology & Pre-Med",
			graduationYear: "2021",
			currentPosition: "Resident Physician at Johns Hopkins",
			image: "https://imgs.search.brave.com/IxMlkh-AvaQm1AQ1RBoFbko9I7rnEFeYriHaxZLBlgA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDkv/OTQ5LzU0Mi9zbWFs/bC9zdHVkZW50LWNl/bGVicmF0ZXMtYWNh/ZGVtaWMtYWNoaWV2/ZW1lbnQtd2l0aC1i/b29rcy1jdXQtb3V0/LXRyYW5zcGFyZW50/LXBuZy5wbmc",
			story:
				"The rigorous pre-med program and research opportunities prepared me exceptionally well for medical school and my current residency at Johns Hopkins Hospital.",
			achievements: [
				"Johns Hopkins Resident",
				"Published 5 Medical Papers",
				"Medical School Valedictorian",
			],
			category: "Healthcare",
			linkedin: "#",
			twitter: "#",
		},
		{
			id: 4,
			name: "Dr. Anjali Mehta",
			program: "Environmental Science",
			graduationYear: "2023",
			currentPosition: "Climate Research Scientist at NASA",
			image: "https://imgs.search.brave.com/2mvgkCCWNE8P5lLige_b71hM5PgDDOBuOc-q7YSFhlM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20va2VnZmlyZS9r/ZWdmaXJlMjIwNy9r/ZWdmaXJlMjIwNzAw/MTk0LzE4ODYyMzEz/OC1kZWxpZ2h0ZWQt/eW91bmctc3R1ZGVu/dC13aXRoLWNvcHli/b29rcy1zbWlsaW5n/LWFmdGVyLWV4YW1z/LmpwZz92ZXI9Ng",
			story:
				"My passion for environmental protection was nurtured at EduVerse. The cutting-edge research facilities and mentorship led to my current role studying climate change at NASA.",
			achievements: [
				"NASA Research Scientist",
				"Climate Change Expert",
				"UN Advisor",
			],
			category: "Research",
			linkedin: "#",
			twitter: "#",
		},
		{
			id: 5,
			name: "Mr. Rajesh Kumar",
			program: "International Relations",
			graduationYear: "2022",
			currentPosition: "Diplomat at US Embassy, Tokyo",
			image: "https://imgs.search.brave.com/XM_rAkoSo5ImNq39v3w8aw3Uu-sI3AM_Xx43eZ7DxdA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/MDAxLzQxMi9zbWFs/bC9taWRkbGUtZWFz/dGVybi1tYWxlLXVu/aXZlcnNpdHktc3R1/ZGVudC1zbWlsaW5n/LWluLWhhbGx3YXkt/YWNhZGVtaWMtc3Vj/Y2Vzcy1hbmQtZGl2/ZXJzaXR5LWNvbmNl/cHQtZm9yLWVkdWNh/dGlvbi1hbmQtc3R1/ZHktYWJyb2FkLXBo/b3RvLmpwZw",
			story:
				"The global perspective and language programs at EduVerse opened doors to international opportunities. I'm now serving as a diplomat, representing our country abroad.",
			achievements: [
				"US Diplomat",
				"Fluent in 4 Languages",
				"International Relations Expert",
			],
			category: "Public Service",
			linkedin: "#",
			twitter: "#",
		},
	]);

	const [activeIndex, setActiveIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Yaha pe automatic Update ho jeyga
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setActiveIndex((prevIndex) =>
				prevIndex === stories.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000); // Slide autamic change hoga 5 seconds ke baad

		return () => clearInterval(interval);
	}, [isAutoPlaying, stories.length]);

	// click krner ke bad pehle aur baad wale story pe jane ke liye
	const handlePrevious = () => {
		setIsAutoPlaying(false);
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? stories.length - 1 : prevIndex - 1
		);
		// 10 sec ke bad aapko resumer dekhaga
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	const handleNext = () => {
		setIsAutoPlaying(false);
		setActiveIndex((prevIndex) =>
			prevIndex === stories.length - 1 ? 0 : prevIndex + 1
		);
		// 10 sec ke bad aapko resumer dekhaga
		setTimeout(() => setIsAutoPlaying(true), 10000);
	};

	// color category ke hisab se
	const getCategoryColor = (category) => {
		const colors = {
			Technology: "primary",
			Entrepreneurship: "success",
			Healthcare: "danger",
			Research: "info",
			"Public Service": "warning",
		};
		return colors[category] || "secondary";
	};

	return (
		<section id="success-stories" className="success-stories-section py-5">
			<Container>
				{/* Section Header */}
				<Row className="text-center mb-5">
					<Col>
						<h2 className="section-title">
							<FaGraduationCap className="me-3" />
							Student Success Stories
						</h2>
						<p className="section-subtitle">
							Discover how our graduates are making their mark in the world
						</p>
					</Col>
				</Row>

				{/* Main Carousel */}
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="stories-carousel-container">
							{/* Navigation Buttons */}
							<button
								className="carousel-nav carousel-nav-prev"
								onClick={handlePrevious}
								aria-label="Previous story"
							>
								<FaArrowLeft />
							</button>

							<button
								className="carousel-nav carousel-nav-next"
								onClick={handleNext}
								aria-label="Next story"
							>
								<FaArrowRight />
							</button>

							{/* Story Card */}
							<Card className="story-card">
								<div className="story-background"></div>
								<Card.Body className="story-content">
									<Row>
										<Col lg={4} className="story-image-section">
											<div className="student-image-placeholder">
												<FaGraduationCap
													size={80}
													className="placeholder-icon"
												/>
											</div>
											<div className="student-info text-center">
												<h3 className="student-name">
													{stories[activeIndex].name}
												</h3>
												<p className="student-program">
													{stories[activeIndex].program} '
													{stories[activeIndex].graduationYear}
												</p>
												<Badge
													bg={getCategoryColor(stories[activeIndex].category)}
													className="category-badge"
												>
													{stories[activeIndex].category}
												</Badge>
											</div>
										</Col>

										<Col lg={8} className="story-text-section">
											<div className="current-position">
												<h4 className="position-title">
													{stories[activeIndex].currentPosition}
												</h4>
											</div>

											<div className="story-quote">
												<FaQuoteLeft className="quote-icon" />
												<p className="quote-text">
													{stories[activeIndex].story}
												</p>
											</div>

											<div className="achievements">
												<h5 className="achievements-title">
													Key Achievements:
												</h5>
												<ul className="achievements-list">
													{stories[activeIndex].achievements.map(
														(achievement, index) => (
															<li key={index} className="achievement-item">
																{achievement}
															</li>
														)
													)}
												</ul>
											</div>

											<div className="social-links">
												<button
													className="social-btn linkedin-btn"
													onClick={() =>
														alert("LinkedIn profile - Coming soon!")
													}
												>
													<FaLinkedin /> LinkedIn
												</button>
												<button
													className="social-btn twitter-btn"
													onClick={() =>
														alert("Twitter profile - Coming soon!")
													}
												>
													<FaTwitter /> Twitter
												</button>
											</div>
										</Col>
									</Row>
								</Card.Body>
							</Card>

							{/* Carousel Indicators */}
							<div className="carousel-indicators-custom">
								{stories.map((_, index) => (
									<button
										key={index}
										className={`indicator ${
											index === activeIndex ? "active" : ""
										}`}
										onClick={() => {
											setActiveIndex(index);
											setIsAutoPlaying(false);
											setTimeout(() => setIsAutoPlaying(true), 10000);
										}}
										aria-label={`Go to story ${index + 1}`}
									></button>
								))}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default StudentSuccessStories;
