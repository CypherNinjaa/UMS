import { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Badge,
	Carousel,
} from "react-bootstrap";
import {
	FaCalendarAlt,
	FaClock,
	FaMapMarkerAlt,
	FaUsers,
	FaImages,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import "./EventsCalendar.css";

// sample event data
const EventsCalendar = () => {
	const [events] = useState([
		{
			id: 1,
			title: "Orientation Day 2025",
			date: "2025-08-15",
			time: "09:00 AM",
			location: "Main Auditorium",
			category: "Academic",
			attendees: 500,
			description: "Welcome new students and introduce them to university life",
		},
	]);
	const [galleryImages] = useState([
		{
			id: 1,
			src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "University Campus - Main Building",
			title: "Beautiful Campus Grounds",
			description:
				"Our stunning campus provides the perfect environment for learning",
		},
		{
			id: 2,
			src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
			alt: "Students in Library",
			title: "State-of-the-Art Library",
			description:
				"Modern facilities equipped with latest technology and resources",
		},
	]);
	// get category colour
	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Academic: "primary",
			Research: "success",
			Career: "warning",
			Cultural: "info",
		};
		return colors[category] || "secondary";
	};
	return (
		<Container>
			<Row className="text-center my-5">
				<Col>
					<h3 className="text-primary mb-4">
						<FaCalendarAlt className="me-2" />
						Upcoming Events
					</h3>
					<p className="section-subtitle">
						Stay updated with the latest events, workshops, and activities
						happening on campus
					</p>
				</Col>
			</Row>
			<Row>
				{/* event list goes here  from left side*/}
				<Col lg={6} className="mb-4">
					{/* events.map() – Loops through all events in the state and creates a Card for each. */}
					{events.map((event) => (
						<Card key={event.id} className="event-card mb-3">
							<Card.Body>
								<Row>
									<Col md={8}>
										{/* events heading */}
										<div className="d-flex align-items-center mb-2">
											<h4 className="event-title mb-0 me-3">{event.title}</h4>
											<Badge bg={getCategoryColor(event.category)}>
												{event.category}
											</Badge>
										</div>
										{/* Event Description */}
										<p className="event-description text-muted mb-3">
											{event.description}
										</p>
										<div className="event-details">
											<div className="detail-item">
												<FaCalendarAlt className="detail-icon" />
												<span>
													{new Date(event.date).toLocaleDateString("en-US", {
														weekday: "long",
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</span>
											</div>
											<div className="detail-item">
												<FaClock className="detail-icon" />
												<span>{event.time}</span>
											</div>
											<div className="detail-item">
												<FaMapMarkerAlt className="detail-icon" />
												<span>{event.location}</span>
											</div>
											<div className="detail-item">
												<FaUsers className="detail-icon" />
												<span>{event.attendees} Expected Attendees</span>
											</div>
										</div>
									</Col>
									<Col
										md={4}
										className="d-flex align-items-center justify-content-end"
									>
										<Button
											variant="primary"
											className="register-btn"
											onClick={() =>
												alert(`Registration for ${event.title} - Coming Soon!`)
											}
										>
											Register Now
										</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					))}
				</Col>
				{/* Gallery Carousel - Right Side */}
				<Col lg={6}>
					<Card className="gallery-card">
						<Card.Header className="gallery-header">
							<h4 className="gallery-title mb-0">
								<FaImages className="me-2" />
								Campus Gallery
							</h4>
						</Card.Header>
						<Card.Body className="p-0">
							<Carousel
								fade
								interval={4000}
								controls={true}
								indicators={true}
								className="campus-carousel"
							>
								{galleryImages.map((image) => (
									<Carousel.Item key={Image.id}>
										<div className="carousel-image-container">
											<img
												className="carousel-image"
												src={image.src}
												alt={image.alt}
											/>
											<div className="carousel-overlay">
												<div className="carousel-content">
													<h5 className="carousel-title">{image.title}</h5>
													<p className="carousel-description">
														{image.description}
													</p>
												</div>
											</div>
										</div>
									</Carousel.Item>
								))}
							</Carousel>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
export default EventsCalendar;
