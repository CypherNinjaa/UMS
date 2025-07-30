import React from "react";
import {
	Modal,
	Button,
	Row,
	Col,
	Badge,
	Card,
	ProgressBar,
	Tab,
	Tabs,
} from "react-bootstrap";
import {
	FaEdit,
	FaGraduationCap,
	FaCalendar,
	FaUsers,
	FaDollarSign,
	FaClock,
	FaMapMarkerAlt,
	FaStar,
	FaCheckCircle,
} from "react-icons/fa";

const ProgramViewModal = ({ show, onHide, program, onEdit }) => {
	if (!program) return null;

	const getStatusBadge = (status) => {
		const variants = {
			Active: "success",
			Planning: "warning",
			Suspended: "danger",
			Completed: "secondary",
			Inactive: "secondary",
		};
		return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
	};

	const getTypeBadge = (type) => {
		const variants = {
			Undergraduate: "primary",
			Graduate: "info",
			Certificate: "warning",
			Diploma: "secondary",
			Doctorate: "dark",
		};
		return <Badge bg={variants[type] || "secondary"}>{type}</Badge>;
	};

	const getEnrollmentPercentage = () => {
		return program.capacity > 0
			? Math.round((program.currentEnrollment / program.capacity) * 100)
			: 0;
	};

	const getEnrollmentVariant = (percentage) => {
		if (percentage >= 90) return "danger";
		if (percentage >= 70) return "warning";
		return "success";
	};

	const formatDate = (date) => {
		return date ? new Date(date).toLocaleDateString() : "Not specified";
	};

	const formatCurrency = (amount) => {
		return amount ? `$${parseFloat(amount).toLocaleString()}` : "Not specified";
	};

	const enrollmentPercentage = getEnrollmentPercentage();

	return (
		<Modal size="xl" show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title className="d-flex align-items-center">
					<FaGraduationCap className="me-2 text-primary" />
					Program Details
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Tabs
					defaultActiveKey="overview"
					id="program-details-tabs"
					className="mb-4"
				>
					{/* Overview Tab */}
					<Tab eventKey="overview" title="Overview">
						<Row>
							<Col md={8}>
								<div className="mb-4">
									<div className="d-flex align-items-center mb-2">
										<h4 className="mb-0 me-3">{program.name}</h4>
										{program.featured && (
											<Badge bg="warning" className="me-2">
												<FaStar className="me-1" />
												Featured
											</Badge>
										)}
										{getStatusBadge(program.status)}
									</div>
									<div className="d-flex align-items-center text-muted mb-3">
										<span className="me-3">
											<strong>Code:</strong> {program.code}
										</span>
										<span className="me-3">{getTypeBadge(program.type)}</span>
										<span>
											<FaClock className="me-1" />
											{program.duration}
										</span>
									</div>
									<p className="lead">{program.description}</p>
								</div>

								<Row className="mb-4">
									<Col sm={6}>
										<Card className="border-0 bg-light h-100">
											<Card.Body className="text-center">
												<FaGraduationCap
													className="text-primary mb-2"
													size={24}
												/>
												<h6>Credits Required</h6>
												<h4 className="text-primary">{program.credits}</h4>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="border-0 bg-light h-100">
											<Card.Body className="text-center">
												<FaDollarSign className="text-success mb-2" size={24} />
												<h6>Annual Tuition</h6>
												<h4 className="text-success">
													{formatCurrency(program.tuitionFee)}
												</h4>
											</Card.Body>
										</Card>
									</Col>
								</Row>

								<div className="mb-4">
									<h6 className="mb-3">Department & Location</h6>
									<div className="d-flex align-items-center mb-2">
										<Badge bg="secondary" className="me-3">
											{program.department}
										</Badge>
										{program.isOnline && (
											<Badge bg="info">
												<FaMapMarkerAlt className="me-1" />
												Online Program
											</Badge>
										)}
									</div>
									{program.accreditation && (
										<div className="mt-2">
											<FaCheckCircle className="text-success me-2" />
											<span className="text-muted">
												{program.accreditation}
											</span>
										</div>
									)}
								</div>
							</Col>

							<Col md={4}>
								<Card>
									<Card.Header>
										<h6 className="mb-0">
											<FaUsers className="me-2" />
											Enrollment Status
										</h6>
									</Card.Header>
									<Card.Body>
										<div className="mb-3">
											<div className="d-flex justify-content-between mb-1">
												<span>Current Enrollment:</span>
												<strong>{program.currentEnrollment || 0}</strong>
											</div>
											<div className="d-flex justify-content-between mb-1">
												<span>Capacity:</span>
												<strong>{program.capacity}</strong>
											</div>
											<div className="d-flex justify-content-between mb-2">
												<span>Utilization:</span>
												<strong>{enrollmentPercentage}%</strong>
											</div>
											<ProgressBar
												variant={getEnrollmentVariant(enrollmentPercentage)}
												now={enrollmentPercentage}
												className="mb-2"
											/>
											<small className="text-muted">
												{program.capacity - (program.currentEnrollment || 0)}{" "}
												seats available
											</small>
										</div>

										{program.rating && program.rating > 0 && (
											<div className="text-center pt-3 border-top">
												<h6>Program Rating</h6>
												<div className="d-flex justify-content-center align-items-center">
													<FaStar className="text-warning me-1" />
													<span className="h5 mb-0">
														{program.rating.toFixed(1)}
													</span>
													<span className="text-muted ms-1">/5.0</span>
												</div>
											</div>
										)}
									</Card.Body>
								</Card>

								<Card className="mt-3">
									<Card.Header>
										<h6 className="mb-0">
											<FaCalendar className="me-2" />
											Important Dates
										</h6>
									</Card.Header>
									<Card.Body>
										<div className="mb-2">
											<strong>Start Date:</strong>
											<div className="text-muted">
												{formatDate(program.startDate)}
											</div>
										</div>
										{program.endDate && (
											<div className="mb-2">
												<strong>End Date:</strong>
												<div className="text-muted">
													{formatDate(program.endDate)}
												</div>
											</div>
										)}
										{program.applicationDeadline && (
											<div className="mb-2">
												<strong>Application Deadline:</strong>
												<div className="text-muted">
													{formatDate(program.applicationDeadline)}
												</div>
											</div>
										)}
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Tab>

					{/* Requirements Tab */}
					<Tab eventKey="requirements" title="Requirements">
						<Row>
							<Col md={6}>
								<h6 className="mb-3">Admission Requirements</h6>
								{program.requirements ? (
									<div className="bg-light p-3 rounded">
										<p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
											{program.requirements}
										</p>
									</div>
								) : (
									<p className="text-muted">No specific requirements listed.</p>
								)}

								{program.prerequisites && (
									<div className="mt-4">
										<h6 className="mb-3">Prerequisites</h6>
										<div className="bg-light p-3 rounded">
											<p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
												{program.prerequisites}
											</p>
										</div>
									</div>
								)}
							</Col>
							<Col md={6}>
								{program.objectives && (
									<div className="mb-4">
										<h6 className="mb-3">Program Objectives</h6>
										<div className="bg-light p-3 rounded">
											<p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
												{program.objectives}
											</p>
										</div>
									</div>
								)}

								{program.outcomes && (
									<div>
										<h6 className="mb-3">Learning Outcomes</h6>
										<div className="bg-light p-3 rounded">
											<p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
												{program.outcomes}
											</p>
										</div>
									</div>
								)}
							</Col>
						</Row>
					</Tab>

					{/* Career Tab */}
					<Tab eventKey="career" title="Career Prospects">
						<Row>
							<Col>
								<h6 className="mb-3">Career Opportunities</h6>
								{program.careerProspects ? (
									<div className="bg-light p-4 rounded">
										<p className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
											{program.careerProspects}
										</p>
									</div>
								) : (
									<div className="text-center py-5">
										<p className="text-muted">
											Career information will be updated soon.
										</p>
									</div>
								)}

								{program.accreditation && (
									<div className="mt-4">
										<h6 className="mb-3">Accreditation & Recognition</h6>
										<div className="bg-light p-3 rounded">
											<div className="d-flex align-items-center">
												<FaCheckCircle className="text-success me-2" />
												<span>{program.accreditation}</span>
											</div>
										</div>
									</div>
								)}
							</Col>
						</Row>
					</Tab>

					{/* Faculty Tab */}
					<Tab eventKey="faculty" title="Faculty">
						<Row>
							<Col>
								<h6 className="mb-3">Assigned Faculty</h6>
								{program.facultyAssigned &&
								program.facultyAssigned.length > 0 ? (
									<div className="row">
										{program.facultyAssigned.map((facultyId, index) => (
											<div key={index} className="col-md-6 mb-3">
												<Card className="border">
													<Card.Body className="py-2">
														<div className="d-flex align-items-center">
															<Badge bg="primary" className="me-2">
																{index + 1}
															</Badge>
															<span>Faculty ID: {facultyId}</span>
														</div>
													</Card.Body>
												</Card>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-5">
										<p className="text-muted">No faculty assigned yet.</p>
									</div>
								)}
							</Col>
						</Row>
					</Tab>
				</Tabs>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Close
				</Button>
				<Button variant="primary" onClick={() => onEdit(program)}>
					<FaEdit className="me-2" />
					Edit Program
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ProgramViewModal;
