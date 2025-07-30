import React from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Tabs,
	Tab,
	Spinner,
	Alert,
} from "react-bootstrap";
import {
	FaNewspaper,
	FaTrophy,
	FaStar,
	FaCalendarAlt,
	FaEye,
	FaMapMarkerAlt,
	FaClock,
} from "react-icons/fa";
import usePublicNews from "../../hooks/usePublicNews";
import "./NewsHighlights.css";

const NewsHighlights = () => {
	const { loading, error, getNewsByCategory, getCategories } = usePublicNews();

	// Get available categories dynamically
	const categories = getCategories();

	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Academic: "success",
			Research: "info",
			Technology: "primary",
			Awards: "warning",
			International: "info",
			Environment: "success",
			Sports: "danger",
			Cultural: "secondary",
			Alumni: "dark",
			Admissions: "primary",
			"Campus Life": "info",
			"Community Service": "success",
			"Student Life": "primary",
			Achievement: "success",
		};
		return colors[category] || "secondary";
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const formatDateTime = (date, time) => {
		if (!date) return "N/A";
		const formattedDate = formatDate(date);
		return time ? `${formattedDate} at ${time}` : formattedDate;
	};

	const handleReadMore = (item) => {
		// You can implement a modal or navigate to a detailed page here
		alert(
			`Full article would open here:\n\nTitle: ${item.title}\n\nContent: ${item.content}`
		);
	};

	const renderNewsCard = (newsItem) => (
		<Col md={6} lg={4} key={newsItem.id} className="mb-3">
			<Card
				className={`news-card h-100 ${newsItem.featured ? "featured" : ""}`}
				style={{ fontSize: "0.9rem" }}
			>
				{newsItem.featured && (
					<div className="featured-badge">
						<FaStar /> Featured
					</div>
				)}
				{newsItem.image && (
					<Card.Img
						variant="top"
						src={newsItem.image}
						alt={newsItem.title}
						style={{ height: "150px", objectFit: "cover" }}
					/>
				)}
				<Card.Body>
					<div className="d-flex justify-content-between align-items-start mb-2">
						<Badge bg={getCategoryColor(newsItem.category)}>
							{newsItem.category}
						</Badge>
						<Badge bg="outline-secondary" className="ms-2">
							{newsItem.type}
						</Badge>
					</div>
					<h5 className="news-title-card">{newsItem.title}</h5>
					<p className="news-excerpt">{newsItem.description}</p>

					{/* Event specific information */}
					{newsItem.type === "Event" && (
						<div className="event-info mb-2">
							{newsItem.eventDate && (
								<div className="small text-primary">
									<FaCalendarAlt className="me-1" />
									Event:{" "}
									{formatDateTime(newsItem.eventDate, newsItem.eventTime)}
								</div>
							)}
							{newsItem.location && (
								<div className="small text-muted">
									<FaMapMarkerAlt className="me-1" />
									{newsItem.location}
								</div>
							)}
						</div>
					)}

					<div className="news-meta">
						<div className="news-date">
							<FaCalendarAlt className="me-1" />
							Published: {formatDate(newsItem.publishDate)}
						</div>
						<Button
							variant="outline-primary"
							size="sm"
							onClick={() => handleReadMore(newsItem)}
						>
							Read More
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);

	if (error) {
		return (
			<section id="news" className="news-section py-5">
				<Container>
					<Row>
						<Col>
							<Alert variant="danger">
								<h5>Unable to Load News</h5>
								<p>{error}</p>
							</Alert>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
	return (
		<section id="news" className="news-section py-5">
			<Container>
				<Row>
					<Col>
						<h3 className="news-title mb-4">Latest News & Events</h3>

						{loading ? (
							<div className="text-center py-5">
								<Spinner animation="border" role="status">
									<span className="visually-hidden">Loading...</span>
								</Spinner>
								<p className="mt-2 text-muted">
									Loading latest news and events...
								</p>
							</div>
						) : (
							<Tabs defaultActiveKey="All" className="news-tabs mb-4">
								{categories.map((category) => (
									<Tab
										eventKey={category}
										title={category === "All" ? "All News" : category}
										key={category}
									>
										<Row>
											{getNewsByCategory(category).length > 0 ? (
												getNewsByCategory(category).map((newsItem) =>
													renderNewsCard(newsItem)
												)
											) : (
												<Col>
													<div className="text-center py-5">
														<p className="text-muted">
															No{" "}
															{category === "All"
																? "news or events"
																: category.toLowerCase() + " items"}{" "}
															available at the moment.
														</p>
													</div>
												</Col>
											)}
										</Row>
									</Tab>
								))}
							</Tabs>
						)}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default NewsHighlights;
