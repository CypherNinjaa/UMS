import React from "react";
import { Modal, Row, Col, Badge, Card, Button } from "react-bootstrap";
import {
	FaUser,
	FaEnvelope,
	FaPhone,
	FaBriefcase,
	FaUniversity,
	FaStar,
	FaCalendarAlt,
	FaMapMarkerAlt,
	FaClock,
	FaDollarSign,
	FaGraduationCap,
	FaBookOpen,
	FaEdit,
} from "react-icons/fa";

const FacultyViewModal = ({ show, onHide, faculty, onEdit }) => {
	if (!faculty) return null;

	const formatDate = (dateString) => {
		if (!dateString) return "Not specified";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getStatusBadge = (status) => {
		const variants = {
			Active: "success",
			Inactive: "secondary",
			Pending: "warning",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	return (
		<Modal show={show} onHide={onHide} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>
					<FaUser className="me-2" />
					Faculty Details
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col md={8}>
						<Card className="border-0">
							<Card.Body className="p-0">
								<div className="d-flex align-items-start mb-4">
									<div className="flex-grow-1">
										<h4 className="mb-1">{faculty.name}</h4>
										<p className="text-muted mb-2">{faculty.title}</p>
										<div className="d-flex align-items-center gap-3 mb-2">
											{getStatusBadge(faculty.status)}
											{faculty.featured && (
												<Badge
													bg="warning"
													className="d-flex align-items-center"
												>
													<FaStar className="me-1" size={12} />
													Distinguished
												</Badge>
											)}
										</div>
									</div>
								</div>

								<Row className="g-3">
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaUniversity className="me-2 text-primary" />
												Department
											</div>
											<div className="info-value">
												{faculty.department || "Not specified"}
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaBriefcase className="me-2 text-primary" />
												Specialization
											</div>
											<div className="info-value">
												{faculty.specialization || "Not specified"}
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaEnvelope className="me-2 text-primary" />
												Email
											</div>
											<div className="info-value">
												<a href={`mailto:${faculty.email}`}>{faculty.email}</a>
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaPhone className="me-2 text-primary" />
												Phone
											</div>
											<div className="info-value">
												<a href={`tel:${faculty.phone}`}>
													{faculty.phone || "Not specified"}
												</a>
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaCalendarAlt className="me-2 text-primary" />
												Join Date
											</div>
											<div className="info-value">
												{formatDate(faculty.joinDate)}
											</div>
										</div>
									</Col>
									<Col md={6}>
										<div className="info-item">
											<div className="info-label">
												<FaBookOpen className="me-2 text-primary" />
												Publications
											</div>
											<div className="info-value">
												{faculty.publications || 0} publications
											</div>
										</div>
									</Col>
									{faculty.office_location && (
										<Col md={6}>
											<div className="info-item">
												<div className="info-label">
													<FaMapMarkerAlt className="me-2 text-primary" />
													Office Location
												</div>
												<div className="info-value">
													{faculty.office_location}
												</div>
											</div>
										</Col>
									)}
									{faculty.office_hours && (
										<Col md={6}>
											<div className="info-item">
												<div className="info-label">
													<FaClock className="me-2 text-primary" />
													Office Hours
												</div>
												<div className="info-value">{faculty.office_hours}</div>
											</div>
										</Col>
									)}
									{faculty.qualification && (
										<Col md={12}>
											<div className="info-item">
												<div className="info-label">
													<FaGraduationCap className="me-2 text-primary" />
													Qualifications
												</div>
												<div className="info-value">
													{faculty.qualification}
												</div>
											</div>
										</Col>
									)}
									{faculty.bio && (
										<Col md={12}>
											<div className="info-item">
												<div className="info-label">
													<FaUser className="me-2 text-primary" />
													Bio
												</div>
												<div className="info-value">{faculty.bio}</div>
											</div>
										</Col>
									)}
									{faculty.research_interests && (
										<Col md={12}>
											<div className="info-item">
												<div className="info-label">
													<FaBookOpen className="me-2 text-primary" />
													Research Interests
												</div>
												<div className="info-value">
													{faculty.research_interests}
												</div>
											</div>
										</Col>
									)}
								</Row>
							</Card.Body>
						</Card>
					</Col>
					<Col md={4}>
						<Card className="bg-light border-0">
							<Card.Body className="text-center">
								{/* Profile Image */}
								<div className="mb-4">
									{faculty.profileImage ? (
										<img
											src={faculty.profileImage}
											alt={faculty.name}
											className="rounded-circle shadow"
											style={{
												width: "120px",
												height: "120px",
												objectFit: "cover",
												border: "4px solid #fff",
											}}
										/>
									) : (
										<div
											className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow"
											style={{
												width: "120px",
												height: "120px",
												border: "4px solid #fff",
												margin: "0 auto",
											}}
										>
											<FaUser size={50} className="text-muted" />
										</div>
									)}
								</div>

								<h6 className="card-title">Quick Stats</h6>
								<div className="mb-3">
									<small className="text-muted">Member since</small>
									<div>{formatDate(faculty.joinDate)}</div>
								</div>
								<div className="mb-3">
									<small className="text-muted">Publications</small>
									<div className="h5 mb-0">{faculty.publications || 0}</div>
								</div>
								<div className="mb-3">
									<small className="text-muted">Status</small>
									<div>{getStatusBadge(faculty.status)}</div>
								</div>
								{faculty.featured && (
									<div className="mb-3">
										<Badge bg="warning" className="w-100 p-2">
											<FaStar className="me-2" />
											Distinguished Faculty
										</Badge>
									</div>
								)}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
				<Button variant="primary" onClick={() => onEdit(faculty)}>
					<FaEdit className="me-2" />
					Edit Profile
				</Button>
			</Modal.Footer>

			<style jsx>{`
				.info-item {
					margin-bottom: 1rem;
				}
				.info-label {
					font-size: 0.875rem;
					color: #6c757d;
					margin-bottom: 0.25rem;
					display: flex;
					align-items-center;
				}
				.info-value {
					font-weight: 500;
					color: #212529;
				}
			`}</style>
		</Modal>
	);
};

export default FacultyViewModal;
