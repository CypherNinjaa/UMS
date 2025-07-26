import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	Badge,
	Tabs,
	Tab,
} from "react-bootstrap";
import {
	FaNewspaper,
	FaTrophy,
	FaStar,
	FaCalendarAlt,
	FaEye,
} from "react-icons/fa";
import "./NewsHighlights.css";

const NewsHighlights = () => {
	const [newsItems] = useState([
		// sample news data
		{
			id: 1,
			category: "Achievement",
			title: "EduVerse University Ranks #1 in National Research Excellence",
			excerpt:
				"Our university has been recognized as the leading research institution for the third consecutive year...",
			date: "2025-07-20",
			image:
				"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Can add image URLs here

			featured: true,
		},
		{
			id: 2,
			category: "Student Life",
			title: "New State-of-the-Art Library Opens This Fall",
			excerpt:
				"The revolutionary learning space features AI-powered study assistants and collaborative zones...",
			date: "2025-07-18",
			image: null,

			featured: false,
		},
	]);

	// Filter news by category
	const getNewsByCategory = (category) => {
		return newsItems.filter((item) =>
			category === "All" ? true : item.category === category
		);
	};
	// Get category color for badges
	const getCategoryColor = (category) => {
		const colors = {
			Achievement: "success",
			"Student Life": "primary",
			Research: "info",
			Awards: "warning",
		};
		return colors[category] || "secondary";
	};
	return (
		<section id="news" className="news-section py-5">
			<Container>
				{/* News and Articel section */}
				<Row>
					<Col>
						<h3 className="news-title mb-4">Latest News</h3>
						<Tabs defaultActiveKey="All" className="news-tabs mb-4">
							<Tab eventKey="All" title="All News">
								<Row>
									{getNewsByCategory("All").map((newsItems) => (
										<Col md={6} lg={6} key={newsItems.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItems.featured ? "featured" : ""
												}`}
											>
												{newsItems.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}
												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItems.category)}>
															{newsItems.category}
														</Badge>
													</div>
													<h5 className="news-title-card">{newsItems.title}</h5>
													<p className="news-excerpt">{newsItems.excerpt}</p>
													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItems.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItems.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
							<Tab eventKey="Achievement" title="Achievement">
								<Row>
									{getNewsByCategory("Achievement").map((newsItems) => (
										<Col md={6} lg={6} key={newsItems.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItems.featured ? "featured" : ""
												}`}
											>
												{newsItems.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}
												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItems.category)}>
															{newsItems.category}
														</Badge>
													</div>
													<h5 className="news-title-card">{newsItems.title}</h5>
													<p className="news-excerpt">{newsItems.excerpt}</p>
													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItems.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItems.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
							<Tab eventKey="Student Life" title="Student Life">
								<Row>
									{getNewsByCategory("Student Life").map((newsItems) => (
										<Col md={6} lg={6} key={newsItems.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItems.featured ? "featured" : ""
												}`}
											>
												{newsItems.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}
												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItems.category)}>
															{newsItems.category}
														</Badge>
													</div>
													<h5 className="news-title-card">{newsItems.title}</h5>
													<p className="news-excerpt">{newsItems.excerpt}</p>
													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItems.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItems.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
							<Tab eventKey="Research" title="Research">
								<Row>
									{getNewsByCategory("Research").map((newsItems) => (
										<Col md={6} lg={6} key={newsItems.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItems.featured ? "featured" : ""
												}`}
											>
												{newsItems.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}
												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItems.category)}>
															{newsItems.category}
														</Badge>
													</div>
													<h5 className="news-title-card">{newsItems.title}</h5>
													<p className="news-excerpt">{newsItems.excerpt}</p>
													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItems.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItems.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
							<Tab eventKey="Awards" title="Awards">
								<Row>
									{getNewsByCategory("Awards").map((newsItems) => (
										<Col md={6} lg={6} key={newsItems.id} className="mb-4">
											<Card
												className={`news-card h-100 ${
													newsItems.featured ? "featured" : ""
												}`}
											>
												{newsItems.featured && (
													<div className="featured-badge">
														<FaStar /> Featured
													</div>
												)}
												<Card.Body>
													<div className="d-flex justify-content-between align-items-start mb-2">
														<Badge bg={getCategoryColor(newsItems.category)}>
															{newsItems.category}
														</Badge>
													</div>
													<h5 className="news-title-card">{newsItems.title}</h5>
													<p className="news-excerpt">{newsItems.excerpt}</p>
													<div className="news-meta">
														<div className="news-date">
															<FaCalendarAlt className="me-1" />
															{new Date(newsItems.date).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
															)}
														</div>
														<Button
															variant="outline-primary"
															size="sm"
															onClick={() =>
																alert(`Reading: ${newsItems.title}`)
															}
														>
															Read More
														</Button>
													</div>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</section>
	);
};
export default NewsHighlights;
