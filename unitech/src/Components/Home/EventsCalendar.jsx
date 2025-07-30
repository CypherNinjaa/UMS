import { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	Badge,
	Carousel,
	Spinner,
	Alert,
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
import usePublicEvents from "../../hooks/usePublicEvents";
import "./EventsCalendar.css";

// Dynamic events from database
const EventsCalendar = () => {
	const { events, loading, error } = usePublicEvents();

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

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Academic: "primary",
			Research: "success",
			Career: "warning",
			Cultural: "info",
			Technology: "primary",
			Sports: "danger",
			Alumni: "dark",
			"Campus Life": "info",
			"Community Service": "success",
		};
		return colors[category] || "secondary";
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const handleRegister = (event) => {
		alert(`Registration for ${event.title} - Coming Soon!`);
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
				{/* Dynamic events list from database */}
				<Col lg={6} className="mb-4">
					{error ? (
						<Alert variant="danger">
							<h5>Unable to Load Events</h5>
							<p>{error}</p>
						</Alert>
					) : loading ? (
						<div className="text-center py-5">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
							<p className="mt-2 text-muted">Loading upcoming events...</p>
						</div>
					) : events.length > 0 ? (
						events.map((event) => (
							<Card key={event.id} className="event-card mb-3">
								<Card.Body>
									<Row>
										<Col md={8}>
											{/* Event heading */}
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
													<span>{formatDate(event.eventDate)}</span>
												</div>
												{event.eventTime && (
													<div className="detail-item">
														<FaClock className="detail-icon" />
														<span>{event.eventTime}</span>
													</div>
												)}
												{event.location && (
													<div className="detail-item">
														<FaMapMarkerAlt className="detail-icon" />
														<span>{event.location}</span>
													</div>
												)}
												{event.registrations > 0 && (
													<div className="detail-item">
														<FaUsers className="detail-icon" />
														<span>{event.registrations} Registered</span>
													</div>
												)}
											</div>
										</Col>
										<Col
											md={4}
											className="d-flex align-items-center justify-content-end"
										>
											<Button
												variant="primary"
												className="register-btn"
												onClick={() => handleRegister(event)}
											>
												Register Now
											</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						))
					) : (
						<div className="text-center py-5">
							<h5>No Upcoming Events</h5>
							<p className="text-muted">
								There are no upcoming events scheduled at the moment. Check back
								later for new events!
							</p>
						</div>
					)}
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
									<Carousel.Item key={image.id}>
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
